import type { Cell, Sym } from '../types/tictactoe.types'
import { PLAYER_COLOR, BOT_COLOR } from '../constants/tictactoe.constants'

interface TttKeyboardHintProps {
  board:   Cell[]
  pSym:    Sym | null
  selCell: number | null
}

export function TttKeyboardHint({ board, pSym, selCell }: TttKeyboardHintProps) {
  return (
    <div style={{
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           '0.5rem',
      animation:     'ttt-slide-up 0.5s 0.15s ease both',
    }}>
      <p style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontSize:   '0.75rem',
        color:      'var(--text-muted)',
        letterSpacing: '0.06em',
        margin:     0,
        textAlign:  'center',
      }}>
        <span style={{ color: 'var(--accent)' }}>1–9</span> to place&nbsp;·&nbsp;
        <span style={{ color: 'var(--accent)' }}>Arrow keys</span> to navigate&nbsp;·&nbsp;
        <span style={{ color: 'var(--accent)' }}>Enter</span> to confirm
      </p>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 3,
      }}>
        {[1,2,3,4,5,6,7,8,9].map(n => {
          const cell = board[n - 1]
          const color = cell
            ? (cell === pSym ? PLAYER_COLOR : BOT_COLOR)
            : 'var(--text-muted)'
          return (
            <div key={n} style={{
              width:          22,
              height:         22,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontFamily:     'Orbitron, monospace',
              fontSize:       '0.48rem',
              fontWeight:     700,
              color,
              border:         `1px solid ${selCell === n - 1 ? 'var(--accent)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius:   4,
              background:     selCell === n - 1 ? 'var(--accent-dim)' : 'rgba(255,255,255,0.02)',
              transition:     'all 0.1s ease',
            }}>
              {n}
            </div>
          )
        })}
      </div>
    </div>
  )
}
