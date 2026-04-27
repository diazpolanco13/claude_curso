#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | node -e "try{console.log(JSON.parse(require('fs').readFileSync(0,'utf8')).tool_input?.file_path||'')}catch{console.log('')}" 2>/dev/null)
[[ "$FILE" =~ \.(ts|tsx|js|jsx)$ ]] || exit 0

ERRORS=$(npx eslint "$FILE" --max-warnings=0 2>&1)
if [[ -n "$ERRORS" ]]; then
  echo "$ERRORS"                              # stdout → Claude lo lee y corrige
  echo "🔶 [hook] ESLint errors → $FILE" >&2
else
  echo "✅ [hook] ESLint OK" >&2
fi
