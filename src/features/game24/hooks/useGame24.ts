import { useState, useCallback, useMemo } from 'react'
import { TARGET, EPS } from '../constants/game24.constants'
import { generatePuzzle, type PuzzleData } from '../utils/generatePuzzle'
import { evaluateExpression } from '../utils/evaluateExpression'
import type { ExprToken, GameStatus, NumberToken } from '../types/game24.types'

/* ─── Public interface ─── */
export interface Game24State {
  numbers:     number[]
  expr:        ExprToken[]
  usedIndices: Set<number>   // derived — which card slots are in expr
  gameStatus:  GameStatus
  evalResult:  number | null
  evalError:   string | null
  solution:    string        // pre-computed for give-up
  solvedCount: number
  isShaking:   boolean
}

export interface Game24Actions {
  newGame:     () => void
  placeNumber: (cardIndex: number) => void
  placeSymbol: (value: string) => void
  backspace:   () => void
  clear:       () => void
  check:       () => void
  giveUp:      () => void
}

function formatNum(n: number): string {
  if (!isFinite(n)) return '?'
  const r = Math.round(n * 1000) / 1000
  return Number.isInteger(r) ? String(r) : r.toFixed(2)
}

export function useGame24(): Game24State & Game24Actions {
  // Single lazy init — both numbers & solution from the same puzzle
  const [puzzle,      setPuzzle]      = useState<PuzzleData>(generatePuzzle)
  const [expr,        setExpr]        = useState<ExprToken[]>([])
  const [gameStatus,  setGameStatus]  = useState<GameStatus>('playing')
  const [evalResult,  setEvalResult]  = useState<number | null>(null)
  const [evalError,   setEvalError]   = useState<string | null>(null)
  const [solvedCount, setSolvedCount] = useState(0)
  const [isShaking,   setIsShaking]   = useState(false)

  const { numbers, solution } = puzzle

  // Derived: which card indices are currently in the expression
  const usedIndices = useMemo<Set<number>>(
    () => new Set(
      expr
        .filter((t): t is NumberToken => t.type === 'number')
        .map(t => t.cardIndex)
    ),
    [expr]
  )

  /* ── Shake helper ── */
  const shake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 620)
  }

  /* ── New game ── */
  const newGame = useCallback(() => {
    setPuzzle(generatePuzzle())
    setExpr([])
    setGameStatus('playing')
    setEvalResult(null)
    setEvalError(null)
  }, [])

  /* ── Place number card ── */
  const placeNumber = useCallback((cardIndex: number) => {
    if (gameStatus !== 'playing') return
    if (usedIndices.has(cardIndex)) return

    setExpr(prev => [
      ...prev,
      { type: 'number', value: String(numbers[cardIndex]), cardIndex },
    ])
    setEvalError(null)
  }, [gameStatus, usedIndices, numbers])

  /* ── Place symbol (+  −  ×  ÷  (  )) ── */
  const placeSymbol = useCallback((value: string) => {
    if (gameStatus !== 'playing') return
    setExpr(prev => [...prev, { type: 'symbol', value }])
    setEvalError(null)
  }, [gameStatus])

  /* ── Backspace ── */
  const backspace = useCallback(() => {
    if (gameStatus !== 'playing') return
    setExpr(prev => prev.slice(0, -1))
    setEvalError(null)
    setEvalResult(null)
  }, [gameStatus])

  /* ── Clear expression ── */
  const clear = useCallback(() => {
    if (gameStatus !== 'playing') return
    setExpr([])
    setEvalError(null)
    setEvalResult(null)
  }, [gameStatus])

  /* ── Check answer ── */
  const check = useCallback(() => {
    if (gameStatus !== 'playing') return

    const numTokens = expr.filter(t => t.type === 'number')
    if (numTokens.length < 4) {
      setEvalError('Use all 4 numbers')
      shake()
      return
    }

    try {
      const result = evaluateExpression(expr)
      setEvalResult(result)

      if (Math.abs(result - TARGET) < EPS) {
        setGameStatus('won')
        setSolvedCount(c => c + 1)
        setEvalError(null)
      } else {
        setEvalError(`= ${formatNum(result)}, not 24`)
        shake()
      }
    } catch (e) {
      setEvalError((e as Error).message)
      setEvalResult(null)
      shake()
    }
  }, [gameStatus, expr])

  /* ── Give up ── */
  const giveUp = useCallback(() => {
    if (gameStatus !== 'playing') return
    setGameStatus('revealed')
    setEvalError(null)
  }, [gameStatus])

  return {
    numbers, expr, usedIndices, gameStatus,
    evalResult, evalError, solution, solvedCount, isShaking,
    newGame, placeNumber, placeSymbol, backspace, clear, check, giveUp,
  }
}
