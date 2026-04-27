#!/bin/bash
# Solo corre si existe tsconfig.json en el proyecto
[[ -f tsconfig.json ]] || exit 0

ERRORS=$(npx tsc --noEmit 2>&1 | head -20)

if [[ -n "$ERRORS" ]]; then
  echo "$ERRORS"                              # stdout → Claude lo lee y corrige
  echo "🔴 [hook] TypeScript errors found" >&2  # stderr → visible en tu terminal
else
  echo "✅ [hook] TypeScript OK" >&2          # 0 tokens — solo va a tu terminal
fi
