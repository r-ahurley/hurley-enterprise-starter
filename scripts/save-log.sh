#!/bin/bash
echo "📘 Appending environment snapshot to DEV_LOG.md"
{
  echo ""
  echo "## 🧭 Environment Snapshot — $(date)"
  echo "• Node: $(node -v)"
  echo "• npm: $(npm -v)"
  echo "• Git: $(git --version)"
  echo "• AWS CLI: $(aws --version 2>&1)"
  echo "✅ Snapshot complete."
  echo ""
} >> DEV_LOG.md

git add DEV_LOG.md
git commit -m "💾 Auto snapshot $(date +%F)"
git push
