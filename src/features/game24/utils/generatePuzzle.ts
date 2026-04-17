import { NUM_MIN, NUM_MAX } from '../constants/game24.constants'
import { solvePuzzle } from './solvePuzzle'

export interface PuzzleData {
  numbers: number[]   // the 4 card values
  solution: string    // a valid solution expression
}

/**
 * Generates 4 random integers in [CARD_MIN, CARD_MAX] that are
 * guaranteed to have at least one solution equalling 24.
 * Loops until a solvable set is found (typically < 5 tries).
 */
export function generatePuzzle(): PuzzleData {
  while (true) {
    const numbers = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * (NUM_MAX - NUM_MIN + 1)) + NUM_MIN
    )
    const solution = solvePuzzle(numbers)
    if (solution !== null) return { numbers, solution }
  }
}
