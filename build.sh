#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

echo "📦 Installing npm dependencies..."
npm install

echo "🎨 Building Tailwind CSS (src/styles.css → dist/styles.css)..."
npm run build

echo "✅ Build complete!"
