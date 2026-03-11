#!/bin/bash

# Script to check or fix copyright headers in all relevant files in the repository

FIX_MODE=""
if [ "$1" = "--fix" ]; then
  FIX_MODE="--fix"
  echo "🔧 Fixing copyright headers in all source files..."
else
  echo "🔍 Checking copyright headers in all source files..."
fi

echo ""

# Find all relevant files and run the copyright checker/fixer
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.scss" -o -name "*.css" -o -name "*.html" -o -name "*.yml" -o -name "*.yaml" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" \
  -not -path "*/.vite/*" \
  -not -path "*/coverage/*" \
  -exec node scripts/check-copyright.js $FIX_MODE {} +

exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo ""
  if [ "$FIX_MODE" = "--fix" ]; then
    echo "✅ All copyright headers have been fixed"
  else
    echo "✅ All files have valid copyright headers"
  fi
else
  echo ""
  if [ "$FIX_MODE" = "--fix" ]; then
    echo "❌ Some errors occurred while fixing copyright headers"
  else
    echo "❌ Some files have invalid or missing copyright headers"
    echo ""
    echo "To fix all files automatically, run:"
    echo "  ./scripts/check-all-copyrights.sh --fix"
  fi
fi

exit $exit_code