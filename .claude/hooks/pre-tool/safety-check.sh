#!/bin/bash
# PreToolUse hook — corre ANTES de que Claude ejecute un comando Bash.
# Exit 0 = permitir. Exit 1 = bloquear y mostrar error a Claude.
INPUT=$(cat)
CMD=$(echo "$INPUT" | node -e "try{console.log(JSON.parse(require('fs').readFileSync(0,'utf8')).tool_input?.command||'')}catch{console.log('')}" 2>/dev/null)

DANGEROUS='rm[[:space:]]+-rf[[:space:]]+/|rm[[:space:]]+--no-preserve-root|DROP[[:space:]]+DATABASE|git[[:space:]]+push[[:space:]]+--force[[:space:]]+origin[[:space:]]+(main|master)'

if echo "$CMD" | grep -qE "$DANGEROUS"; then
  echo "🚫 [pre-tool] Comando bloqueado: $CMD" >&2
  exit 1
fi
