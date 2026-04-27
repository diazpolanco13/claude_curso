#!/bin/bash
# PreToolUse hook — corre ANTES de que Claude ejecute un comando Bash.
# Exit 0 = permitir. Exit 1 = bloquear y mostrar error a Claude.
CMD=$(python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

# grep -E (POSIX extendido) — compatible con macOS y Linux
DANGEROUS='rm[[:space:]]+-rf[[:space:]]+/|rm[[:space:]]+--no-preserve-root|DROP[[:space:]]+DATABASE|git[[:space:]]+push[[:space:]]+--force[[:space:]]+origin[[:space:]]+(main|master)'

if echo "$CMD" | grep -qE "$DANGEROUS"; then
  echo "🚫 [pre-tool] Comando bloqueado: $CMD" >&2
  exit 1
fi

echo "✅ [pre-tool] Bash aprobado" >&2
