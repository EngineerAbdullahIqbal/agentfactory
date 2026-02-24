#!/usr/bin/env python3
"""Authenticate with Panaversity SSO using Authorization Code + PKCE.

Uses only Python 3.13+ stdlib — no pip install required.
Saves tokens to ~/.agentfactory/credentials.json (chmod 600).

Commands:
    python3 auth.py ensure   # Valid id_token -> stdout (login if needed)
    python3 auth.py token    # Cached id_token -> stdout (fail if none)
    python3 auth.py login    # Force browser flow -> stdout
"""

import base64
import hashlib
import json
import os
import secrets
import sys
import time
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import Request, urlopen

SSO_URL = "https://sso.panaversity.org"
CLIENT_ID = "learn-skill-cli-client"
CALLBACK_PORT = 9876
SCOPES = "openid profile email offline_access"
CREDENTIALS_PATH = Path.home() / ".agentfactory" / "credentials.json"

# ── PKCE helpers ─────────────────────────────────────────────────────────


def _pkce_pair() -> tuple[str, str]:
    """Generate PKCE code_verifier and S256 code_challenge."""
    verifier = secrets.token_urlsafe(64)[:128]
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")
    return verifier, challenge


# ── URL builders ─────────────────────────────────────────────────────────


def _sso_url() -> str:
    return os.environ.get("PANAVERSITY_SSO_URL", SSO_URL).rstrip("/")


def _authorize_url(state: str, challenge: str) -> str:
    """Build the /oauth2/authorize URL."""
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": f"http://localhost:{CALLBACK_PORT}/callback",
        "response_type": "code",
        "scope": SCOPES,
        "state": state,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
    }
    return f"{_sso_url()}/api/auth/oauth2/authorize?{urlencode(params)}"


# ── Token exchange ───────────────────────────────────────────────────────


def _exchange_code(code: str, verifier: str) -> dict:
    """POST /oauth2/token with authorization_code + code_verifier."""
    body = urlencode({
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "code": code,
        "redirect_uri": f"http://localhost:{CALLBACK_PORT}/callback",
        "code_verifier": verifier,
    }).encode()
    req = Request(f"{_sso_url()}/api/auth/oauth2/token", data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except HTTPError as e:
        err_body = e.read().decode(errors="replace")
        print(f"Token exchange failed: {e.code} {err_body}", file=sys.stderr)
        sys.exit(1)


def _refresh(creds: dict) -> dict | None:
    """POST /oauth2/token with refresh_token. Returns new tokens or None."""
    refresh_token = creds.get("refresh_token")
    if not refresh_token:
        return None

    body = urlencode({
        "grant_type": "refresh_token",
        "client_id": CLIENT_ID,
        "refresh_token": refresh_token,
    }).encode()
    req = Request(f"{_sso_url()}/api/auth/oauth2/token", data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except HTTPError:
        return None


# ── Callback server ──────────────────────────────────────────────────────


def _run_callback_server(expected_state: str) -> str:
    """Start http.server on localhost:CALLBACK_PORT, capture one auth code."""
    captured = {}

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            params = parse_qs(urlparse(self.path).query)
            code = params.get("code", [None])[0]
            state = params.get("state", [None])[0]
            error = params.get("error", [None])[0]

            if error:
                captured["error"] = params.get("error_description", [error])[0]
                self._send_html("Authentication failed. You can close this tab.")
                return

            if not code or not state:
                captured["error"] = "Missing code or state in callback"
                self._send_html("Authentication failed. You can close this tab.")
                return

            if not secrets.compare_digest(state, expected_state):
                captured["error"] = "State mismatch — possible CSRF"
                self._send_html("Authentication failed. You can close this tab.")
                return

            captured["code"] = code
            self._send_html(
                "Authenticated! You can close this tab and return to your terminal."
            )

        def _send_html(self, message: str):
            body = (
                f"<html><body style='font-family:system-ui;text-align:center;"
                f"padding:60px'><h2>{message}</h2></body></html>"
            ).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_args):
            pass  # Silence request logging

    try:
        server = HTTPServer(("127.0.0.1", CALLBACK_PORT), Handler)
    except OSError as e:
        print(
            f"Cannot start callback server on port {CALLBACK_PORT}: {e}\n"
            f"Is another process using this port?",
            file=sys.stderr,
        )
        sys.exit(1)

    server.timeout = 120
    server.handle_request()
    server.server_close()

    if "error" in captured:
        print(f"Auth failed: {captured['error']}", file=sys.stderr)
        sys.exit(1)

    if "code" not in captured:
        print("Auth timed out — no callback received within 120s.", file=sys.stderr)
        sys.exit(1)

    return captured["code"]


# ── Credential storage ───────────────────────────────────────────────────


def _load_credentials() -> dict | None:
    """Read ~/.agentfactory/credentials.json or return None."""
    if not CREDENTIALS_PATH.exists():
        return None
    try:
        return json.loads(CREDENTIALS_PATH.read_text())
    except (json.JSONDecodeError, OSError):
        return None


def _save_credentials(tokens: dict) -> None:
    """Write tokens to disk with authenticated_at timestamp. chmod 600."""
    tokens["authenticated_at"] = int(time.time())
    CREDENTIALS_PATH.parent.mkdir(parents=True, exist_ok=True)
    CREDENTIALS_PATH.write_text(json.dumps(tokens, indent=2))
    CREDENTIALS_PATH.chmod(0o600)


def _is_expired(creds: dict) -> bool:
    """Check if token has expired: authenticated_at + expires_in < now."""
    authenticated_at = creds.get("authenticated_at", 0)
    expires_in = creds.get("expires_in", 0)
    if not authenticated_at or not expires_in:
        return True
    return time.time() > authenticated_at + expires_in


# ── Public commands ──────────────────────────────────────────────────────


def login() -> str:
    """Full browser auth flow. Returns id_token."""
    state = secrets.token_urlsafe(32)
    verifier, challenge = _pkce_pair()

    url = _authorize_url(state, challenge)

    print("Opening browser for authentication...", file=sys.stderr)
    try:
        webbrowser.open(url)
    except Exception:
        print(f"Open this URL in your browser:\n{url}", file=sys.stderr)

    code = _run_callback_server(state)

    tokens = _exchange_code(code, verifier)
    _save_credentials(tokens)

    id_token = tokens.get("id_token")
    if not id_token:
        print("No id_token in response — check SSO OIDC config.", file=sys.stderr)
        sys.exit(1)

    print("Authenticated successfully!", file=sys.stderr)
    return id_token


def token() -> str:
    """Return cached id_token or fail."""
    creds = _load_credentials()
    if not creds:
        print("Not authenticated. Run: python3 scripts/auth.py ensure", file=sys.stderr)
        sys.exit(1)

    if _is_expired(creds):
        print("Token expired. Run: python3 scripts/auth.py ensure", file=sys.stderr)
        sys.exit(1)

    id_token = creds.get("id_token")
    if not id_token:
        print("No id_token cached. Run: python3 scripts/auth.py login", file=sys.stderr)
        sys.exit(1)

    return id_token


def ensure() -> str:
    """Return valid id_token, refreshing or logging in as needed."""
    creds = _load_credentials()

    # Fast path: valid cached token
    if creds and not _is_expired(creds):
        id_token = creds.get("id_token")
        if id_token:
            return id_token

    # Try refresh
    if creds and creds.get("refresh_token"):
        new_tokens = _refresh(creds)
        if new_tokens:
            _save_credentials(new_tokens)
            id_token = new_tokens.get("id_token")
            if id_token:
                print("Token refreshed.", file=sys.stderr)
                return id_token

    # Full login
    return login()


# ── CLI dispatch ─────────────────────────────────────────────────────────

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "ensure"

    match cmd:
        case "ensure":
            print(ensure())
        case "token":
            print(token())
        case "login":
            print(login())
        case _:
            print(
                "Usage: auth.py [ensure|token|login]\n"
                "  ensure  Valid id_token (login if needed) [default]\n"
                "  token   Cached id_token (fail if none)\n"
                "  login   Force browser flow",
                file=sys.stderr,
            )
            sys.exit(1)
