#!/bin/bash
FILE=$(python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)
[[ "$FILE" =~ \.(ts|tsx|js|jsx)$ ]] || exit 0

ERRORS=$(npx eslint "$FILE" --max-warnings=0 2>&1)
if [[ -n "$ERRORS" ]]; then
  echo "$ERRORS"                              # stdout → Claude lo lee y corrige
  echo "🔶 [hook] ESLint errors → $FILE" >&2
else
  echo "✅ [hook] ESLint OK" >&2
fi
