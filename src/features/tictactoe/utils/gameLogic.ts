import type { Cell, Sym } from '../types/tictactoe.types'
import { WIN_LINES } from '../constants/tictactoe.constants'

export function checkWinner(b: Cell[]): Sym | null {
  for (const [a, x, c] of WIN_LINES) {
    if (b[a] && b[a] === b[x] && b[a] === b[c]) return b[a] as Sym
  }
  return null
}

export function checkWinLine(b: Cell[]): number[] | null {
  for (const line of WIN_LINES) {
    const [a, x, c] = line
    if (b[a] && b[a] === b[x] && b[a] === b[c]) return [...line]
  }
  return null
}

function minimax(
  b: Cell[], depth: number, isMax: boolean,
  botS: Sym, playerS: Sym,
): number {
  const w = checkWinner(b)
  if (w === botS)    return 10 - depth
  if (w === playerS) return depth - 10
  if (b.every(c => c !== null)) return 0

  if (isMax) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = botS
        best = Math.max(best, minimax(b, depth + 1, false, botS, playerS))
        b[i] = null
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = playerS
        best = Math.min(best, minimax(b, depth + 1, true, botS, playerS))
        b[i] = null
      }
    }
    return best
  }
}

export function getBestMove(b: Cell[], botS: Sym, playerS: Sym): number {
  let best = -Infinity, move = -1
  for (let i = 0; i < 9; i++) {
    if (!b[i]) {
      b[i] = botS
      const s = minimax(b, 0, false, botS, playerS)
      b[i] = null
      if (s > best) { best = s; move = i }
    }
  }
  return move
}
