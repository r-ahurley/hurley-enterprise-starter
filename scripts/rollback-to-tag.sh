#!/usr/bin/env bash

# 🕹 Roll back to a specific stable tag
if [ -z "$1" ]; then
  echo "❌ Please provide a tag name (e.g. stable-backend-v4)"
  exit 1
fi

TAG_NAME=$1

git fetch --tags
git checkout $TAG_NAME

echo "✅ Rolled back to $TAG_NAME. You are now in detached HEAD state."
echo "👉 Run 'git switch main' to return to the main branch after inspection."

