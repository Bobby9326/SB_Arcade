import { useState, useEffect, useCallback, useRef } from 'react'
import {
  WORD_LENGTH, MAX_ROWS, FLIP_DURATION, FLIP_GAP,
  WIN_MESSAGES, RANDOM_WORD_API, DICTIONARY_API, STATUS_PRIORITY,
} from '../constants/wordle.constants'
import { evaluateGuess } from '../utils/evaluateGuess'
import type { TileStatus, GameStatus } from '../types/wordle.types'

/* ─── Public interface ─── */
export interface WordleState {
  board:         string[][]
  tileStatuses:  TileStatus[][]
  currentRow:    number
  keyStatuses:   Record<string, TileStatus>
  targetWord:    string
  gameStatus:    GameStatus
  isLoading:     boolean
  isChecking:    boolean
  isRevealing:   boolean
  revealingRow:  number | null
  shakingRow:    number | null
  bounceRow:     number | null
  popTile:       string | null
  toastMsg:      string
  toastVisible:  boolean
}

export interface WordleActions {
  fetchWord:    () => Promise<void>
  addLetter:    (letter: string) => void
  removeLetter: () => void
  submitGuess:  () => Promise<void>
  handleKeyClick: (key: string) => void
}

const emptyBoard    = () => Array(MAX_ROWS).fill(null).map(() => Array(WORD_LENGTH).fill(''))
const emptyStatuses = () => Array(MAX_ROWS).fill(null).map(() => Array(WORD_LENGTH).fill('') as TileStatus[])

export function useWordle(): WordleState & WordleActions {
  const [targetWord,    setTargetWord]    = useState('')
  const [board,         setBoard]         = useState<string[][]>(emptyBoard())
  const [tileStatuses,  setTileStatuses]  = useState<TileStatus[][]>(emptyStatuses())
  const [currentRow,    setCurrentRow]    = useState(0)
  const [currentCol,    setCurrentCol]    = useState(0)
  const [keyStatuses,   setKeyStatuses]   = useState<Record<string, TileStatus>>({})
  const [gameStatus,    setGameStatus]    = useState<GameStatus>('idle')
  const [isLoading,     setIsLoading]     = useState(false)
  const [isChecking,    setIsChecking]    = useState(false)
  const [isRevealing,   setIsRevealing]   = useState(false)
  const [revealingRow,  setRevealingRow]  = useState<number | null>(null)
  const [shakingRow,    setShakingRow]    = useState<number | null>(null)
  const [bounceRow,     setBounceRow]     = useState<number | null>(null)
  const [popTile,       setPopTile]       = useState<string | null>(null)
  const [toastMsg,      setToastMsg]      = useState('')
  const [toastVisible,  setToastVisible]  = useState(false)

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Toast ── */
  const showToast = useCallback((msg: string, duration = 2500) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToastMsg(msg)
    setToastVisible(true)
    toastTimer.current = setTimeout(() => setToastVisible(false), duration)
  }, [])

  /* ── Reset ── */
  const resetBoard = () => {
    setBoard(emptyBoard())
    setTileStatuses(emptyStatuses())
    setCurrentRow(0)
    setCurrentCol(0)
    setKeyStatuses({})
    setIsRevealing(false)
    setRevealingRow(null)
    setShakingRow(null)
    setBounceRow(null)
  }

  /* ── Fetch word ── */
  const fetchWord = async () => {
    setIsLoading(true)
    try {
      let validWord: string | null = null

      while (!validWord) {
        const res  = await fetch(RANDOM_WORD_API)
        if (!res.ok) throw new Error()
        const data = await res.json()
        const word = (data[0] as string).toLowerCase()

        try {
          const dictRes = await fetch(`${DICTIONARY_API}/${word}`)
          if (dictRes.ok) validWord = word.toUpperCase()
        } catch {
          // retry on dict error
        }
      }

      setTargetWord(validWord)
      resetBoard()
      setGameStatus('playing')
      showToast('New word ready — good luck!', 2000)
    } catch {
      showToast('Could not load a word. Try again.', 3000)
    }
    setIsLoading(false)
  }

  /* ── Add letter ── */
  const addLetter = useCallback((letter: string) => {
    if (gameStatus !== 'playing' || isRevealing || isChecking) return
    if (currentCol >= WORD_LENGTH) return

    const key = `${currentRow}-${currentCol}`
    setPopTile(key)
    setTimeout(() => setPopTile(p => (p === key ? null : p)), 140)

    setBoard(prev => {
      const next = prev.map(r => [...r])
      next[currentRow][currentCol] = letter
      return next
    })
    setTileStatuses(prev => {
      const next = prev.map(r => [...r]) as TileStatus[][]
      next[currentRow][currentCol] = 'tbd'
      return next
    })
    setCurrentCol(c => c + 1)
  }, [gameStatus, isRevealing, isChecking, currentRow, currentCol])

  /* ── Remove letter ── */
  const removeLetter = useCallback(() => {
    if (gameStatus !== 'playing' || isRevealing || isChecking) return
    if (currentCol <= 0) return
    const col = currentCol - 1
    setBoard(prev => {
      const next = prev.map(r => [...r])
      next[currentRow][col] = ''
      return next
    })
    setTileStatuses(prev => {
      const next = prev.map(r => [...r]) as TileStatus[][]
      next[currentRow][col] = ''
      return next
    })
    setCurrentCol(col)
  }, [gameStatus, isRevealing, isChecking, currentRow, currentCol])

  /* ── Submit guess ── */
  const submitGuess = useCallback(async () => {
    if (gameStatus !== 'playing' || isRevealing || isChecking) return
    if (currentCol < WORD_LENGTH) {
      showToast('Not enough letters')
      setShakingRow(currentRow)
      setTimeout(() => setShakingRow(null), 650)
      return
    }

    const word = board[currentRow].join('')
    setIsChecking(true)

    try {
      const res = await fetch(`${DICTIONARY_API}/${word.toLowerCase()}`)
      if (!res.ok) {
        showToast('Not in word list!')
        setShakingRow(currentRow)
        setTimeout(() => setShakingRow(null), 650)
        setIsChecking(false)
        return
      }
    } catch {
      showToast('Network error — try again.')
      setIsChecking(false)
      return
    }

    setIsChecking(false)

    const result = evaluateGuess(word, targetWord)

    // Reveal animation — update each tile at its scaleY=0 midpoint
    setIsRevealing(true)
    setRevealingRow(currentRow)

    for (let i = 0; i < WORD_LENGTH; i++) {
      const col = i
      setTimeout(() => {
        setTileStatuses(prev => {
          const next = prev.map(r => [...r]) as TileStatus[][]
          next[currentRow][col] = result[col]
          return next
        })
      }, FLIP_GAP * col + FLIP_DURATION / 2)
    }

    const totalReveal = FLIP_GAP * (WORD_LENGTH - 1) + FLIP_DURATION

    setTimeout(() => {
      setIsRevealing(false)
      setRevealingRow(null)

      // Update keyboard colours — higher priority wins
      setKeyStatuses(prev => {
        const next = { ...prev }
        for (let i = 0; i < WORD_LENGTH; i++) {
          const letter = word[i]
          const status = result[i]
          if (!next[letter] || STATUS_PRIORITY[status] > STATUS_PRIORITY[next[letter]]) {
            next[letter] = status
          }
        }
        return next
      })

      const won = result.every(s => s === 'correct')
      if (won) {
        setGameStatus('won')
        setBounceRow(currentRow)
        showToast(WIN_MESSAGES[currentRow] ?? 'You won!', 4000)
      } else if (currentRow === MAX_ROWS - 1) {
        setGameStatus('lost')
        showToast(`The word was ${targetWord}`, 5000)
      } else {
        setCurrentRow(r => r + 1)
        setCurrentCol(0)
      }
    }, totalReveal)
  }, [gameStatus, isRevealing, isChecking, currentRow, currentCol, board, targetWord, showToast])

  /* ── Physical keyboard listener ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return
      if (e.key === 'Enter')              submitGuess()
      else if (e.key === 'Backspace')     removeLetter()
      else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase())
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [addLetter, removeLetter, submitGuess])

  /* ── On-screen key dispatcher ── */
  const handleKeyClick = useCallback((key: string) => {
    if (key === 'ENTER')  submitGuess()
    else if (key === '⌫') removeLetter()
    else                   addLetter(key)
  }, [submitGuess, removeLetter, addLetter])

  return {
    // state
    board, tileStatuses, currentRow, keyStatuses, targetWord,
    gameStatus, isLoading, isChecking, isRevealing,
    revealingRow, shakingRow, bounceRow, popTile,
    toastMsg, toastVisible,
    // actions
    fetchWord, addLetter, removeLetter, submitGuess, handleKeyClick,
  }
}
