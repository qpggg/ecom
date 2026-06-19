#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

: "${DEPLOY_HOST:?Set DEPLOY_HOST, e.g. user@1.2.3.4}"
: "${DEPLOY_PATH:?Set DEPLOY_PATH, e.g. /var/www/ecom}"

echo "→ Building production bundle..."
npm ci
npm run build

echo "→ Uploading dist/ to ${DEPLOY_HOST}:${DEPLOY_PATH}/"
rsync -avz --delete \
  --exclude '.DS_Store' \
  dist/ "${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "→ Done. Check https://your-domain/"
