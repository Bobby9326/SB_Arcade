import { useState, useEffect, useCallback, useRef } from 'react'
import type { Cell, Sym, Turn, GameStatus, Scores } from '../types/tictactoe.types'
import { checkWinner, checkWinLine, getBestMove } from '../utils/gameLogic'

export function useTicTacToe() {
  const [board,      setBoard]      = useState<Cell[]>(Array(9).fill(null))
  const [pSym,       setPSym]       = useState<Sym | null>(null)
  const [bSym,       setBSym]       = useState<Sym | null>(null)
  const [turn,       setTurn]       = useState<Turn>(null)
  const [status,     setStatus]     = useState<GameStatus>('idle')
  const [winLine,    setWinLine]    = useState<number[] | null>(null)
  const [scores,     setScores]     = useState<Scores>({ w: 0, l: 0, d: 0 })
  const [flipDisp,   setFlipDisp]   = useState<'player' | 'bot'>('player')
  const [flipResult, setFlipResult] = useState<'player' | 'bot' | null>(null)
  const [thinking,   setThinking]   = useState(false)
  const [selCell,    setSelCell]    = useState<number | null>(null)
  const [hoverCell,  setHoverCell]  = useState<number | null>(null)
  const [lastPlaced, setLastPlaced] = useState<number | null>(null)
  const [flipKey,    setFlipKey]    = useState(0)

  const boardRef = useRef<Cell[]>(board)
  useEffect(() => { boardRef.current = board }, [board])

  /* ── Start game + coin flip ── */
  const startGame = useCallback(() => {
    const result: 'player' | 'bot' = Math.random() < 0.5 ? 'player' : 'bot'
    const newPSym: Sym = result === 'player' ? 'X' : 'O'
    const newBSym: Sym = result === 'player' ? 'O' : 'X'

    setBoard(Array(9).fill(null))
    setWinLine(null)
    setLastPlaced(null)
    setSelCell(null)
    setFlipResult(null)
    setFlipDisp('player')
    setStatus('flipping')
    setThinking(false)
    setTurn(null)
    setFlipKey(k => k + 1)

    const steps = [75,75,75,75,75,85,95,110,130,158,192,235,288,352]
    let t = 0
    let cur: 'player' | 'bot' = 'player'

    for (const ms of steps) {
      t += ms
      cur = cur === 'player' ? 'bot' : 'player'
      const v = cur
      setTimeout(() => setFlipDisp(v), t)
    }

    if (cur !== result) {
      t += 420
      setTimeout(() => setFlipDisp(result), t)
    }

    const revealAt = t + 60
    setTimeout(() => setFlipResult(result), revealAt)

    setTimeout(() => {
      setPSym(newPSym)
      setBSym(newBSym)
      setTurn(result)
      setStatus('playing')
      if (result === 'bot') setThinking(true)
    }, revealAt + 980)
  }, [])

  /* ── Bot move ── */
  useEffect(() => {
    if (status !== 'playing' || turn !== 'bot' || !bSym || !pSym) return

    setThinking(true)
    const timer = setTimeout(() => {
      const b = [...boardRef.current] as Cell[]
      const move = getBestMove(b, bSym, pSym)
      if (move === -1) return

      b[move] = bSym
      setBoard([...b])
      setLastPlaced(move)
      setThinking(false)

      const winner = checkWinner(b)
      if (winner) {
        setWinLine(checkWinLine(b))
        setStatus('lost')
        setTurn(null)
        setScores(s => ({ ...s, l: s.l + 1 }))
      } else if (b.every(c => c !== null)) {
        setStatus('draw')
        setTurn(null)
        setScores(s => ({ ...s, d: s.d + 1 }))
      } else {
        setTurn('player')
      }
    }, 750)

    return () => clearTimeout(timer)
  }, [turn, status, bSym, pSym])

  /* ── Player move ── */
  const placePlayer = useCallback((idx: number) => {
    if (status !== 'playing' || turn !== 'player' || !pSym) return
    if (board[idx] !== null) return

    const b = [...board] as Cell[]
    b[idx] = pSym
    setBoard(b)
    setLastPlaced(idx)

    const winner = checkWinner(b)
    if (winner) {
      setWinLine(checkWinLine(b))
      setStatus('won')
      setTurn(null)
      setScores(s => ({ ...s, w: s.w + 1 }))
    } else if (b.every(c => c !== null)) {
      setStatus('draw')
      setTurn(null)
      setScores(s => ({ ...s, d: s.d + 1 }))
    } else {
      setTurn('bot')
    }
  }, [status, turn, board, pSym])

  /* ── Keyboard ── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (status === 'idle' || status === 'flipping') return
      if (e.ctrlKey || e.altKey || e.metaKey) return

      if (/^[1-9]$/.test(e.key)) {
        const idx = +e.key - 1
        setSelCell(idx)
        placePlayer(idx)
        return
      }

      const arrows: Record<string, [number, number]> = {
        ArrowUp: [-1, 0], ArrowDown: [1, 0],
        ArrowLeft: [0, -1], ArrowRight: [0, 1],
      }
      if (arrows[e.key]) {
        e.preventDefault()
        const [dr, dc] = arrows[e.key]
        setSelCell(prev => {
          const cur = prev ?? 4
          const r = Math.min(2, Math.max(0, Math.floor(cur / 3) + dr))
          const c = Math.min(2, Math.max(0, (cur % 3) + dc))
          return r * 3 + c
        })
        return
      }

      if ((e.key === 'Enter' || e.key === ' ') && selCell !== null) {
        placePlayer(selCell)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [status, placePlayer, selCell])

  return {
    board, pSym, bSym, turn, status, winLine, scores,
    flipDisp, flipResult, thinking, selCell, hoverCell, lastPlaced, flipKey,
    startGame, placePlayer,
    setHoverCell, setSelCell,
  }
}
