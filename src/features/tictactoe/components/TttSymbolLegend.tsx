import type { Sym } from '../types/tictactoe.types'
import { PLAYER_COLOR, BOT_COLOR } from '../constants/tictactoe.constants'

interface TttSymbolLegendProps {
  pSym: Sym
  bSym: Sym | null
}

export function TttSymbolLegend({ pSym, bSym }: TttSymbolLegendProps) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', animation: 'ttt-glow-in 0.4s ease both' }}>
      {([
        { who: 'YOU', sym: pSym,  color: PLAYER_COLOR },
        { who: 'BOT', sym: bSym,  color: BOT_COLOR    },
      ] as const).map(({ who, sym, color }) => (
        <div key={who} style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '0.5rem',
          padding:    '5px 14px',
          border:     `1px solid ${color}33`,
          borderRadius: 8,
          background: `${color}0A`,
        }}>
          <span style={{
            fontFamily: 'Orbitron, monospace',
            fontSize:   '1rem',
            fontWeight: 900,
            color,
          }}>
            {sym}
          </span>
          <span style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.5rem',
            letterSpacing: '0.2em',
            color:         'var(--text-muted)',
          }}>
            {who}
          </span>
        </div>
      ))}
    </div>
  )
}
