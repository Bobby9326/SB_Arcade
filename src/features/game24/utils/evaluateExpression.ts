import type { ExprToken } from '../types/game24.types'

/**
 * Recursive-descent parser for an ExprToken array.
 * Handles correct operator precedence: × ÷ bind tighter than + −.
 * Throws a descriptive Error on any invalid input.
 */
export function evaluateExpression(tokens: ExprToken[]): number {
  const vals = tokens.map(t => t.value)
  let pos = 0

  function peek(): string | undefined { return vals[pos] }
  function consume(): string {
    if (pos >= vals.length) throw new Error('Unexpected end of expression')
    return vals[pos++]
  }

  function parseExpr(): number {
    let left = parseTerm()
    while (peek() === '+' || peek() === '-') {
      const op = consume()
      const right = parseTerm()
      left = op === '+' ? left + right : left - right
    }
    return left
  }

  function parseTerm(): number {
    let left = parseFactor()
    while (peek() === '×' || peek() === '÷') {
      const op = consume()
      const right = parseFactor()
      if (op === '÷') {
        if (Math.abs(right) < 1e-10) throw new Error('Cannot divide by zero')
        left /= right
      } else {
        left *= right
      }
    }
    return left
  }

  function parseFactor(): number {
    const tok = peek()
    if (tok === '(') {
      consume()
      const val = parseExpr()
      if (peek() !== ')') throw new Error("Missing closing ')'")
      consume()
      return val
    }
    const raw = consume()
    const n   = parseFloat(raw)
    if (isNaN(n)) throw new Error(`Unexpected token: "${raw}"`)
    return n
  }

  const result = parseExpr()
  if (pos < vals.length) throw new Error('Expression has extra tokens')
  if (!isFinite(result))  throw new Error('Result is not a finite number')
  return result
}
