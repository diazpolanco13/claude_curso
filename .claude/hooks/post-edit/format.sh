#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | node -e "try{console.log(JSON.parse(require('fs').readFileSync(0,'utf8')).tool_input?.file_path||'')}catch{console.log('')}" 2>/dev/null)
if [[ "$FILE" =~ \.(ts|tsx|js|jsx|json)$ ]]; then
  npx prettier --write "$FILE" >/dev/null 2>&1
  echo "✨ [hook] prettier → $FILE" >&2
fi
