import type { Operator } from '../types/game24.types'

export const TARGET   = 24
export const NUM_MIN  = 1
export const NUM_MAX  = 9

/** Operators available on the keypad */
export const OPERATORS: Operator[] = ['+', '-', '×', '÷']

/** Floating-point tolerance for equality checks */
export const EPS = 1e-9
