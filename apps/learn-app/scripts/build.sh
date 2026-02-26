#!/bin/bash
set -euo pipefail

# Build script for Docusaurus with i18n support
#
# Docusaurus has a known memory leak between locale builds (gray-matter cache,
# MDX processor cache, webpack compiler objects) — see:
# https://github.com/facebook/docusaurus/issues/10944
#
# Strategy: Build each locale in a SEPARATE Node process so leaked memory is
# reclaimed by the OS between builds. This keeps peak usage under 4 GB,
# fitting comfortably on Vercel's standard 8 GB build machines.
#
# @docusaurus/faster flags (SWC + Lightning CSS) are enabled for speed.
# rspackBundler is intentionally DISABLED — it leaks more memory per locale.

# Change to learn-app directory (parent of scripts/)
cd "$(dirname "$0")/.."

# Flashcard validation + Anki generation run via nx dependsOn (project.json)
# before this script is invoked — no need to duplicate here.

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')

# 4 GB heap per locale — each build runs in its own process
HEAP_SIZE="--max-old-space-size=4096"

# Node.js 25+ requires --localstorage-file flag
EXTRA_FLAGS=""
if [ "$NODE_VERSION" -ge 25 ]; then
  EXTRA_FLAGS="--localstorage-file=/tmp/docusaurus-localstorage"
fi

export NODE_OPTIONS="$HEAP_SIZE $EXTRA_FLAGS"

echo "==> Building locale: en (default)"
npx docusaurus build --locale en

echo "==> Building locale: ur"
# When building a single non-default locale separately, Docusaurus uses
# the configured baseUrl ("/") for all asset and link references — it does
# NOT add the locale path prefix. We override BASE_URL so all generated
# URLs (assets, docs, canonical) correctly reference /ur/... paths.
BASE_URL="/ur/" npx docusaurus build --locale ur --out-dir build-ur

# Merge: the ur build outputs files at the ROOT of build-ur/ (not in a
# ur/ subdirectory). Copy them into build/ur/ so Vercel serves them at
# the /ur/ path matching the URLs in the HTML.
mkdir -p build/ur
cp -r build-ur/* build/ur/
rm -rf build-ur

echo "==> Build complete (en + ur merged into build/)"
