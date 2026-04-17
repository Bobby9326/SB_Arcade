import type { Mode } from '../types/fifastat.types'

interface FifaModeSelectorProps {
  mode:     Mode
  onSelect: (m: Mode) => void
}

const MODES: { value: Mode; label: string; sub: string }[] = [
  { value: 'random', label: 'RANDOM ALL',     sub: 'Position + stats randomized' },
  { value: 'pick',   label: 'BY POSITION',    sub: 'You choose the position'      },
]

export function FifaModeSelector({ mode, onSelect }: FifaModeSelectorProps) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {MODES.map(m => {
        const active = mode === m.value
        return (
          <button
            key={m.value}
            onClick={() => onSelect(m.value)}
            style={{
              flex:          1,
              padding:       '12px 10px',
              background:    active ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.03)',
              border:        `1px solid ${active ? 'rgba(249,115,22,0.55)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius:  10,
              cursor:        'pointer',
              textAlign:     'left',
              transition:    'all 0.15s ease',
              boxShadow:     active ? '0 0 18px rgba(249,115,22,0.12)' : 'none',
            }}
          >
            <div style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.52rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              color:         active ? 'var(--accent)' : 'var(--text-secondary)',
              marginBottom:  3,
            }}>
              {m.label}
            </div>
            <div style={{
              fontFamily:  'Rajdhani, sans-serif',
              fontSize:    '0.7rem',
              color:       'var(--text-muted)',
              lineHeight:  1.3,
            }}>
              {m.sub}
            </div>
          </button>
        )
      })}
    </div>
  )
}
