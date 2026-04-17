import type { GameStatus, Sym } from '../types/tictactoe.types'
import { PLAYER_COLOR, BOT_COLOR } from '../constants/tictactoe.constants'

interface TttStatusBarProps {
  status:   GameStatus
  thinking: boolean
  pSym:     Sym | null
  bSym:     Sym | null
}

export function TttStatusBar({ status, thinking, pSym, bSym }: TttStatusBarProps) {
  const color =
    status === 'won'  ? '#22C55E' :
    status === 'lost' ? '#EF4444' :
    status === 'draw' ? '#F59E0B' :
    thinking          ? BOT_COLOR :
                        PLAYER_COLOR

  const shadow =
    status === 'won'  ? '0 0 16px rgba(34,197,94,0.2)'  :
    status === 'lost' ? '0 0 16px rgba(239,68,68,0.2)'  :
    status === 'draw' ? '0 0 16px rgba(245,158,11,0.2)' :
                        'none'

  return (
    <div style={{
      fontFamily:    'Orbitron, monospace',
      fontSize:      '0.62rem',
      letterSpacing: '0.14em',
      fontWeight:    700,
      padding:       '7px 20px',
      border:        '1px solid var(--border)',
      borderRadius:  99,
      background:    'rgba(255,255,255,0.02)',
      display:       'flex',
      alignItems:    'center',
      gap:           '0.5rem',
      color,
      animation:     'ttt-glow-in 0.3s ease both',
      boxShadow:     shadow,
    }}>
      {status === 'won'  && '🏆  YOU WIN!'}
      {status === 'lost' && `${bSym}  BOT WINS`}
      {status === 'draw' && "⊜  IT'S A DRAW"}
      {status === 'playing' && thinking && (
        <>
          <span style={{ color: BOT_COLOR }}>BOT THINKING</span>
          <span style={{ display: 'flex', gap: 3 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width:        5,
                height:       5,
                borderRadius: '50%',
                background:   BOT_COLOR,
                display:      'inline-block',
                animation:    `ttt-thinking-dot 1.2s ${i * 0.2}s ease infinite`,
              }} />
            ))}
          </span>
        </>
      )}
      {status === 'playing' && !thinking && `⚡  YOUR TURN — ${pSym}`}
    </div>
  )
}
