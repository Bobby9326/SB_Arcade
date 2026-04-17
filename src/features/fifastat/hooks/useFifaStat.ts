import { useState, useCallback } from 'react'
import type { Position, RolledResult, Mode } from '../types/fifastat.types'
import { rollPosition, rollRandom } from '../utils/randomize'

export function useFifaStat() {
  const [mode,    setMode]    = useState<Mode>('random')
  const [picked,  setPicked]  = useState<Position | null>(null)
  const [result,  setResult]  = useState<RolledResult | null>(null)
  const [rolling, setRolling] = useState(false)

  const roll = useCallback(() => {
    setRolling(true)
    // small delay for visual feedback
    setTimeout(() => {
      try {
        const r = mode === 'random' ? rollRandom() : rollPosition(picked!)
        setResult(r)
      } finally {
        setRolling(false)
      }
    }, 120)
  }, [mode, picked])

  const pickMode = useCallback((m: Mode) => {
    setMode(m)
    setResult(null)
    if (m === 'random') setPicked(null)
  }, [])

  const pickPosition = useCallback((p: Position) => {
    setPicked(p)
    setResult(null)
  }, [])

  const canRoll = mode === 'random' || picked !== null

  return { mode, picked, result, rolling, canRoll, pickMode, pickPosition, roll }
}
