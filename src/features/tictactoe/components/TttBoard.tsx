import type { Cell, Sym, GameStatus, Turn } from '../types/tictactoe.types'
import { PLAYER_COLOR, BOT_COLOR } from '../constants/tictactoe.constants'

interface TttBoardProps {
  board:       Cell[]
  pSym:        Sym | null
  status:      GameStatus
  turn:        Turn
  winLine:     number[] | null
  lastPlaced:  number | null
  selCell:     number | null
  hoverCell:   number | null
  onPlace:     (idx: number) => void
  onHoverIn:   (idx: number) => void
  onHoverOut:  () => void
}

export function TttBoard({
  board, pSym, status, turn, winLine, lastPlaced,
  selCell, hoverCell, onPlace, onHoverIn, onHoverOut,
}: TttBoardProps) {
  const isWon  = status === 'won'
  const isLost = status === 'lost'

  const winColor = isWon
    ? { bg: 'rgba(34,197,94,0.12)',  border: '#22C55E', glow: 'rgba(34,197,94,0.5)'  }
    : { bg: 'rgba(96,165,250,0.12)', border: '#60A5FA', glow: 'rgba(96,165,250,0.5)' }

  function symColor(sym: Sym | null) {
    return sym === pSym ? PLAYER_COLOR : BOT_COLOR
  }

  function getCellContent(idx: number): { val: Sym | null; ghost: boolean } {
    if (board[idx]) return { val: board[idx] as Sym, ghost: false }
    if (hoverCell === idx && turn === 'player' && status === 'playing' && pSym)
      return { val: pSym, ghost: true }
    return { val: null, ghost: false }
  }

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap:                 7,
      padding:             '1rem',
      background:          'rgba(255,255,255,0.015)',
      border:              '1px solid var(--border)',
      borderRadius:        18,
      boxShadow:           '0 8px 48px rgba(0,0,0,0.35)',
      animation:           'ttt-glow-in 0.4s ease both',
    }}>
      {Array(9).fill(null).map((_, idx) => {
        const { val, ghost } = getCellContent(idx)
        const winCell  = winLine?.includes(idx) ?? false
        const loseCell = (isWon || isLost) && !!winLine && !winLine.includes(idx) && board[idx] !== null
        const selected = selCell === idx
        const canPlace = status === 'playing' && turn === 'player' && !board[idx]
        const color    = val ? symColor(val) : 'transparent'
        const isNew    = board[idx] !== null && idx === lastPlaced

        return (
          <div
            key={idx}
            className={`ttt-cell${canPlace ? ' ttt-cell-canplay' : ''}`}
            onClick={() => onPlace(idx)}
            onMouseEnter={() => onHoverIn(idx)}
            onMouseLeave={onHoverOut}
            style={{
              width:          'clamp(90px, 19vw, 112px)',
              height:         'clamp(90px, 19vw, 112px)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       'clamp(2rem, 5.5vw, 2.8rem)',
              fontFamily:     'Orbitron, monospace',
              fontWeight:     900,
              cursor:         canPlace ? 'pointer' : 'default',
              borderRadius:   12,
              border:         selected
                ? '2px solid var(--accent)'
                : winCell
                ? `2px solid ${winColor.border}`
                : '2px solid rgba(255,255,255,0.07)',
              background: winCell ? winColor.bg : loseCell ? 'rgba(0,0,0,0.25)' : 'transparent',
              color:      ghost ? `${color}55` : color,
              opacity:    loseCell ? 0.3 : 1,
              userSelect: 'none',
              boxShadow:  winCell
                ? `0 0 18px ${winColor.glow}, 0 0 40px ${winColor.glow}`
                : selected
                ? '0 0 14px var(--accent-glow)'
                : 'none',
            }}
          >
            <span style={{
              display:   'block',
              animation: winCell
                ? `${isWon ? 'ttt-win-pulse-green' : 'ttt-win-pulse-blue'} 1.6s ${idx * 80}ms ease infinite`
                : isNew
                ? 'ttt-place 0.28s cubic-bezier(0.34,1.56,0.64,1) both'
                : 'none',
              filter: 'none',
            }}>
              {val}
            </span>
          </div>
        )
      })}
    </div>
  )
}
