#!/bin/bash
set -euo pipefail

# Build script for Docusaurus with i18n support
#
# With multiple locales (en + ur), Docusaurus builds them sequentially in one
# process. There is a known memory leak between locale builds (gray-matter cache,
# MDX processor cache, webpack compiler objects) — see:
# https://github.com/facebook/docusaurus/issues/10944
#
# Mitigations:
# 1. Heap size set to 8GB (up from 4GB) to handle 2-locale builds
# 2. @docusaurus/faster flags enabled (SWC + Lightning CSS) for speed
# 3. rspackBundler intentionally DISABLED — it leaks more memory per locale
#
# If more locales are added (3+), switch to building locales separately:
#   docusaurus build --locale en && docusaurus build --locale ur --out-dir build/ur
#   (requires baseUrl adjustments per locale)

# Change to learn-app directory (parent of scripts/)
cd "$(dirname "$0")/.."

# Flashcard validation + Anki generation run via nx dependsOn (project.json)
# before this script is invoked — no need to duplicate here.

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')

# 8GB heap to handle multi-locale builds (en + ur = ~1472 docs x 2)
# The en build alone fits in 4GB, but memory leaks between locale builds
# push total usage past 4GB. 8GB gives ~4GB headroom for the second locale.
HEAP_SIZE="--max-old-space-size=8192"

# Node.js 25+ requires --localstorage-file flag
EXTRA_FLAGS=""
if [ "$NODE_VERSION" -ge 25 ]; then
  EXTRA_FLAGS="--localstorage-file=/tmp/docusaurus-localstorage"
fi

NODE_OPTIONS="$HEAP_SIZE $EXTRA_FLAGS" npx docusaurus build
