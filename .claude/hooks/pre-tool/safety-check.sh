#!/bin/bash
# PreToolUse hook — corre ANTES de que Claude ejecute un comando Bash.
# Exit 0 = permitir. Exit 1 = bloquear y mostrar error a Claude.
CMD=$(python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

DANGEROUS='rm\s+-rf\s+/|rm\s+--no-preserve-root|DROP\s+DATABASE|git\s+push\s+--force\s+origin\s+ma(in|ster)'

if echo "$CMD" | grep -qP "$DANGEROUS" 2>/dev/null || echo "$CMD" | grep -qE "$DANGEROUS"; then
  echo "🚫 [pre-tool] Comando bloqueado por safety-check: $CMD" >&2
  exit 1
fi

echo "✅ [pre-tool] Bash aprobado" >&2
