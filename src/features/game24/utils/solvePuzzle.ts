import { EPS, OPERATORS } from '../constants/game24.constants'
import { permutations } from './permutations'
import type { Operator } from '../types/game24.types'

function applyOp(a: number, op: Operator, b: number): number | null {
  if (op === '÷' && Math.abs(b) < EPS) return null
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '×': return a * b
    case '÷': return a / b
  }
}

function near24(n: number): boolean {
  return Math.abs(n - 24) < EPS
}

/**
 * Brute-force solver: tries all permutations of 4 numbers, all
 * combinations of 3 operators, and all 5 bracket structures.
 *
 * Returns the first solution as a human-readable string, or null.
 *
 * The 5 structures for numbers (a b c d) and ops (op1 op2 op3):
 *   1.  ((a op1 b) op2 c) op3 d
 *   2.  (a op1 (b op2 c)) op3 d
 *   3.  (a op1 b) op2 (c op3 d)
 *   4.  a op1 ((b op2 c) op3 d)
 *   5.  a op1 (b op2 (c op3 d))
 */
export function solvePuzzle(nums: number[]): string | null {
  for (const [a, b, c, d] of permutations(nums)) {
    for (const op1 of OPERATORS) {
      for (const op2 of OPERATORS) {
        for (const op3 of OPERATORS) {

          const ab = applyOp(a, op1, b)
          const bc = applyOp(b, op2, c)
          const cd = applyOp(c, op3, d)

          // Structure 1: ((a op1 b) op2 c) op3 d
          if (ab !== null) {
            const abc = applyOp(ab, op2, c)
            if (abc !== null) {
              const r = applyOp(abc, op3, d)
              if (r !== null && near24(r))
                return `((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`
            }
          }

          // Structure 2: (a op1 (b op2 c)) op3 d
          if (bc !== null) {
            const abc = applyOp(a, op1, bc)
            if (abc !== null) {
              const r = applyOp(abc, op3, d)
              if (r !== null && near24(r))
                return `(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d}`
            }
          }

          // Structure 3: (a op1 b) op2 (c op3 d)
          if (ab !== null && cd !== null) {
            const r = applyOp(ab, op2, cd)
            if (r !== null && near24(r))
              return `(${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d})`
          }

          // Structure 4: a op1 ((b op2 c) op3 d)
          if (bc !== null) {
            const bcd = applyOp(bc, op3, d)
            if (bcd !== null) {
              const r = applyOp(a, op1, bcd)
              if (r !== null && near24(r))
                return `${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`
            }
          }

          // Structure 5: a op1 (b op2 (c op3 d))
          if (cd !== null) {
            const bcd = applyOp(b, op2, cd)
            if (bcd !== null) {
              const r = applyOp(a, op1, bcd)
              if (r !== null && near24(r))
                return `${a} ${op1} (${b} ${op2} (${c} ${op3} ${d}))`
            }
          }
        }
      }
    }
  }
  return null
}
