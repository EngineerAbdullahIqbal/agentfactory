#!/usr/bin/env python3
"""Content API client for learn-agentfactory skill.

Single entry point for all Content API operations.
Handles token loading (with expiry check), auth headers, and error responses.

Uses only Python stdlib — no pip install required.

Usage:
    python3 scripts/api.py tree
    python3 scripts/api.py lesson <part> <chapter> <lesson>
    python3 scripts/api.py complete <chapter> <lesson> [duration_secs]
    python3 scripts/api.py progress
    python3 scripts/api.py health
"""

import json
import os
import sys
import time
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

CREDENTIALS_PATH = Path.home() / ".agentfactory" / "credentials.json"
DEFAULT_API_URL = "https://content-api.panaversity.org"


def _load_token() -> str:
    """Load auth token, checking env var first, then credentials file.

    Priority: AGENTFACTORY_USER_ID_TOKEN env var > credentials.json id_token.
    Removes expired credentials automatically so the agent re-authenticates.
    """
    # Env var override (for CI, testing, external token injection)
    env_token = os.environ.get("AGENTFACTORY_USER_ID_TOKEN")
    if env_token:
        return env_token

    if not CREDENTIALS_PATH.exists():
        print(
            "ERROR: Not authenticated.\n"
            "Run: python3 scripts/auth.py ensure",
            file=sys.stderr,
        )
        sys.exit(1)

    try:
        creds = json.loads(CREDENTIALS_PATH.read_text())
    except (json.JSONDecodeError, OSError) as e:
        print(f"ERROR: Cannot read credentials: {e}", file=sys.stderr)
        sys.exit(1)

    # Check expiry: authenticated_at + expires_in < now
    authenticated_at = creds.get("authenticated_at", 0)
    expires_in = creds.get("expires_in", 0)
    if authenticated_at and expires_in:
        if time.time() > authenticated_at + expires_in:
            CREDENTIALS_PATH.unlink(missing_ok=True)
            print(
                "ERROR: Token expired.\n"
                "Run: python3 scripts/auth.py ensure",
                file=sys.stderr,
            )
            sys.exit(1)

    # Prefer id_token (JWT) — validates locally at both content-api and progress-api
    token = creds.get("id_token") or creds.get("access_token")
    if not token:
        print(
            "ERROR: No token in credentials.\n"
            "Run: python3 scripts/auth.py ensure",
            file=sys.stderr,
        )
        sys.exit(1)

    return token


def _base_url() -> str:
    return os.environ.get("CONTENT_API_URL", DEFAULT_API_URL).rstrip("/")


def _refresh_and_retry(make_request) -> dict:
    """On 401, run auth.py ensure to refresh token, then retry once."""
    import subprocess

    script_dir = Path(__file__).parent
    auth_script = script_dir / "auth.py"
    result = subprocess.run(
        [sys.executable, str(auth_script), "ensure"],
        capture_output=True, text=True, timeout=120,
    )
    if result.returncode != 0:
        print("ERROR: Token refresh failed.\n"
              "Run: python3 scripts/auth.py login", file=sys.stderr)
        sys.exit(1)

    # Retry with fresh token
    return make_request()


def _api_get(path: str, params: dict | None = None) -> dict:
    """Authenticated GET to Content API. Auto-retries once on 401."""
    def _do_request():
        url = f"{_base_url()}{path}"
        if params:
            url_with_params = url + "?" + urlencode(params)
        else:
            url_with_params = url

        token = _load_token()
        req = Request(url_with_params)
        req.add_header("Authorization", f"Bearer {token}")
        req.add_header("Accept", "application/json")

        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())

    try:
        return _do_request()
    except HTTPError as e:
        if e.code == 401:
            return _refresh_and_retry(_do_request)
        _handle_http_error(e)
    except OSError as e:
        print(f"ERROR: Connection failed: {e}", file=sys.stderr)
        sys.exit(1)
    return {}  # unreachable


def _api_post(path: str, data: dict) -> dict:
    """Authenticated POST to Content API. Auto-retries once on 401."""
    def _do_request():
        url = f"{_base_url()}{path}"
        body = json.dumps(data).encode()

        token = _load_token()
        req = Request(url, data=body, method="POST")
        req.add_header("Authorization", f"Bearer {token}")
        req.add_header("Content-Type", "application/json")
        req.add_header("Accept", "application/json")

        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())

    try:
        return _do_request()
    except HTTPError as e:
        if e.code == 401:
            return _refresh_and_retry(_do_request)
        _handle_http_error(e)
    except OSError as e:
        print(f"ERROR: Connection failed: {e}", file=sys.stderr)
        sys.exit(1)
    return {}  # unreachable


def _handle_http_error(e: HTTPError):
    """Handle HTTP errors with actionable messages."""
    if e.code == 401:
        print(
            "ERROR: Token expired or invalid.\n"
            "Run: python3 scripts/auth.py ensure",
            file=sys.stderr,
        )
        sys.exit(1)
    elif e.code == 402:
        body = _safe_json(e)
        msg = body.get("detail", "Insufficient credits")
        print(f"ERROR: Payment required — {msg}", file=sys.stderr)
        sys.exit(1)
    elif e.code == 403:
        body = _safe_json(e)
        msg = body.get("detail", "Access denied")
        print(f"ERROR: Forbidden — {msg}", file=sys.stderr)
        sys.exit(1)
    elif e.code == 404:
        print("ERROR: Not found. Check part/chapter/lesson slugs.", file=sys.stderr)
        sys.exit(1)
    elif e.code == 429:
        print("ERROR: Rate limited. Wait a moment and try again.", file=sys.stderr)
        sys.exit(1)
    elif e.code == 503:
        body = _safe_json(e)
        msg = body.get("detail", "Service unavailable")
        print(f"ERROR: Service unavailable — {msg}", file=sys.stderr)
        sys.exit(1)
    else:
        body_text = e.read().decode(errors="replace")
        print(f"ERROR: HTTP {e.code}: {body_text}", file=sys.stderr)
        sys.exit(1)


def _safe_json(e: HTTPError) -> dict:
    """Try to parse error body as JSON, return empty dict on failure."""
    try:
        return json.loads(e.read())
    except Exception:
        return {}


# ── Commands ──────────────────────────────────────────────────────────────


def cmd_health():
    """Check API health (no auth required)."""
    url = f"{_base_url()}/health"
    try:
        with urlopen(Request(url), timeout=10) as resp:
            data = json.loads(resp.read())
            print(json.dumps(data, indent=2))
    except Exception as e:
        print(f"ERROR: Health check failed: {e}", file=sys.stderr)
        sys.exit(1)


def cmd_tree():
    """Fetch book tree structure."""
    data = _api_get("/api/v1/content/tree")
    print(json.dumps(data, indent=2))


def cmd_lesson(*args: str):
    """Fetch a single lesson.

    Accepts either:
        lesson <path>                  (uses path from tree, e.g. "01-Part/02-ch/03-lesson")
        lesson <part> <chapter> <lesson>  (legacy 3-arg form)
    """
    if len(args) == 1:
        data = _api_get("/api/v1/content/lesson", {"path": args[0]})
    elif len(args) == 3:
        data = _api_get(
            "/api/v1/content/lesson",
            {"part": args[0], "chapter": args[1], "lesson": args[2]},
        )
    else:
        print("Usage: api.py lesson <path>  OR  api.py lesson <part> <chapter> <lesson>", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(data, indent=2))


def cmd_complete(chapter: str, lesson: str, duration: int = 0):
    """Mark a lesson complete."""
    data = _api_post(
        "/api/v1/content/complete",
        {
            "chapter_slug": chapter,
            "lesson_slug": lesson,
            "active_duration_secs": duration,
            "source": "skill",
        },
    )
    print(json.dumps(data, indent=2))


def cmd_progress():
    """Fetch user's learning progress."""
    data = _api_get("/api/v1/content/progress")
    print(json.dumps(data, indent=2))


# ── Entry point ───────────────────────────────────────────────────────────

USAGE = """\
Usage: api.py <command> [args]

Commands:
  health                                    Check API health
  tree                                      Browse book structure
  lesson <path>                             Read a lesson (path from tree)
  lesson <part> <chapter> <lesson>          Read a lesson (legacy 3-arg)
  complete <chapter> <lesson> [duration]    Mark lesson complete
  progress                                  View learning progress

Auth: python3 scripts/auth.py ensure       (separate module)

Environment:
  CONTENT_API_URL              API base URL (default: https://content-api.panaversity.org)
  PANAVERSITY_SSO_URL          SSO base URL (default: https://sso.panaversity.org)
  AGENTFACTORY_USER_ID_TOKEN   Override token (CI/testing)
"""


def main():
    if len(sys.argv) < 2:
        print(USAGE)
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == "health":
        cmd_health()

    elif cmd == "tree":
        cmd_tree()

    elif cmd == "lesson":
        cmd_lesson(*sys.argv[2:])

    elif cmd == "complete":
        if len(sys.argv) < 4:
            print(
                "Usage: api.py complete <chapter> <lesson> [duration_secs]",
                file=sys.stderr,
            )
            sys.exit(1)
        duration = int(sys.argv[4]) if len(sys.argv) > 4 else 0
        cmd_complete(sys.argv[2], sys.argv[3], duration)

    elif cmd == "progress":
        cmd_progress()

    else:
        print(f"Unknown command: {cmd}", file=sys.stderr)
        print(USAGE)
        sys.exit(1)


if __name__ == "__main__":
    main()
