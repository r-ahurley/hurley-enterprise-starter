#!/bin/bash
echo "🧠 Initializing new project..."
read -p "Project name: " project
read -p "AWS S3 bucket name (optional): " bucket

echo "🔧 Customizing templates..."
find . -type f -exec sed -i '' "s/Hurley Enterprise Starter/${project}/g" {} +

if [ -n "$bucket" ]; then
  find . -type f -exec sed -i '' "s/soccerworld-test-bucket-1759514277/${bucket}/g" {} +
fi

mv README_TEMPLATE.md README.md
mv DEV_LOG_TEMPLATE.md DEV_LOG.md

echo "✅ Project initialized for ${project}"
