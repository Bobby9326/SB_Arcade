import type { Scores } from '../types/tictactoe.types'

interface TttScoreboardProps {
  scores: Scores
}

const ITEMS = [
  { key: 'w' as const, label: 'WINS',   color: '#22C55E', dim: 'rgba(34,197,94,0.08)'  },
  { key: 'd' as const, label: 'DRAWS',  color: '#F59E0B', dim: 'rgba(245,158,11,0.08)' },
  { key: 'l' as const, label: 'LOSSES', color: '#EF4444', dim: 'rgba(239,68,68,0.08)'  },
]

export function TttScoreboard({ scores }: TttScoreboardProps) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', animation: 'ttt-slide-up 0.5s 0.05s ease both' }}>
      {ITEMS.map(({ key, label, color, dim }) => {
        const val = scores[key]
        return (
          <div key={label} style={{
            textAlign:  'center',
            padding:    '8px 18px',
            background: val > 0 ? dim : 'rgba(255,255,255,0.02)',
            border:     '1px solid var(--border)',
            borderRadius: 10,
            minWidth:   72,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.48rem',
              letterSpacing: '0.22em',
              color:         'var(--text-muted)',
              marginBottom:  2,
            }}>
              {label}
            </div>
            <div style={{
              fontFamily: 'Orbitron, monospace',
              fontSize:   '1.5rem',
              fontWeight: 800,
              color:      val > 0 ? color : 'var(--text-muted)',
              lineHeight: 1.1,
              transition: 'color 0.3s ease',
            }}>
              {val}
            </div>
          </div>
        )
      })}
    </div>
  )
}
