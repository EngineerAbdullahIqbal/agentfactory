#!/bin/bash
set -euo pipefail

# Build script that conditionally adds --localstorage-file flag for Node.js 25+

# Change to learn-app directory (parent of scripts/)
cd "$(dirname "$0")/.."

# Flashcard validation + Anki generation run via nx dependsOn (project.json)
# before this script is invoked — no need to duplicate here.

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')

# Increase heap size for OG image generation (default is often too small in CI)
# 4GB should handle 200+ docs with OG image generation
HEAP_SIZE="--max-old-space-size=4096"

if [ "$NODE_VERSION" -ge 25 ]; then
  # Node.js 25+ requires --localstorage-file flag
  # Use npx to properly resolve the docusaurus binary
  NODE_OPTIONS="$HEAP_SIZE --localstorage-file=/tmp/docusaurus-localstorage" npx docusaurus build
else
  # Node.js 20-24 doesn't need the flag
  NODE_OPTIONS="$HEAP_SIZE" npx docusaurus build
fi
