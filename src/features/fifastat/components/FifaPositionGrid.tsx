import type { Position } from '../types/fifastat.types'
import { POSITION_ROWS } from '../constants/positionWeights'

interface FifaPositionGridProps {
  picked:   Position | null
  onPick:   (p: Position) => void
}

export function FifaPositionGrid({ picked, onPick }: FifaPositionGridProps) {
  return (
    <div style={{
      background:   'rgba(255,255,255,0.02)',
      border:       '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      padding:      14,
    }}>
      <div style={{
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.42rem',
        letterSpacing: '0.22em',
        color:         'var(--text-muted)',
        marginBottom:  10,
      }}>
        SELECT POSITION
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {POSITION_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 7 }}>
            {row.map(pos => {
              const active = picked === pos
              return (
                <button
                  key={pos}
                  onClick={() => onPick(pos)}
                  style={{
                    width:         60,
                    height:        44,
                    fontFamily:    'Orbitron, monospace',
                    fontSize:      '0.6rem',
                    fontWeight:    700,
                    letterSpacing: '0.08em',
                    background:    active ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.04)',
                    border:        `1px solid ${active ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius:  8,
                    color:         active ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor:        'pointer',
                    transition:    'all 0.15s ease',
                    boxShadow:     active ? '0 0 14px rgba(249,115,22,0.22)' : 'none',
                    transform:     active ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {pos}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
