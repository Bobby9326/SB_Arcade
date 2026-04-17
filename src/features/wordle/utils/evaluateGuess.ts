import { WORD_LENGTH } from '../constants/wordle.constants'
import type { TileStatus } from '../types/wordle.types'

/**
 * Compares a 5-letter guess against the target word.
 * Uses two-pass algorithm:
 *   Pass 1 — mark exact matches (correct)
 *   Pass 2 — mark letters present but in wrong position (present)
 *   Remainder — absent
 *
 * Duplicate-letter handling: each target letter can only satisfy
 * one guess letter, preventing false "present" highlights.
 */
export function evaluateGuess(guess: string, target: string): TileStatus[] {
  const result: TileStatus[] = Array(WORD_LENGTH).fill('absent')
  const tArr = target.split('')
  const gArr = guess.split('')

  // Pass 1: correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (gArr[i] === tArr[i]) {
      result[i] = 'correct'
      tArr[i]   = '#'  // consume
      gArr[i]   = '*'  // consumed
    }
  }

  // Pass 2: present but wrong position
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (gArr[i] === '*') continue
    const idx = tArr.indexOf(gArr[i])
    if (idx !== -1) {
      result[i]   = 'present'
      tArr[idx]   = '#'  // consume
    }
  }

  return result
}
