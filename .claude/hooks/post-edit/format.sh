#!/bin/bash
FILE=$(python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)
if [[ "$FILE" =~ \.(ts|tsx|js|jsx|json)$ ]]; then
  npx prettier --write "$FILE" >/dev/null 2>&1
  echo "✨ [hook] prettier → $FILE" >&2
fi
