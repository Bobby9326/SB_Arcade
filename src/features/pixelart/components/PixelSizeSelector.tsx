import type { GridSize } from '../types/pixelart.types'
import { GRID_SIZES } from '../constants/pixelart.constants'

interface PixelSizeSelectorProps {
  gridSize:    GridSize
  onSizeChange: (s: GridSize) => void
}

export function PixelSizeSelector({ gridSize, onSizeChange }: PixelSizeSelectorProps) {
  return (
    <div style={{
      background:   'rgba(255,255,255,0.02)',
      border:       '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      padding:      10,
    }}>
      <div style={{
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.42rem',
        letterSpacing: '0.22em',
        color:         'var(--text-muted)',
        marginBottom:  8,
      }}>
        CANVAS SIZE
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {GRID_SIZES.map(s => {
          const active = gridSize === s
          return (
            <button
              key={s}
              onClick={() => onSizeChange(s)}
              style={{
                flex:          1,
                padding:       '7px 4px',
                fontFamily:    'Orbitron, monospace',
                fontSize:      '0.52rem',
                fontWeight:    700,
                letterSpacing: '0.06em',
                background:    active ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.03)',
                border:        `1px solid ${active ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius:  7,
                color:         active ? 'var(--accent)' : 'var(--text-secondary)',
                cursor:        'pointer',
                transition:    'all 0.15s ease',
                boxShadow:     active ? '0 0 12px rgba(249,115,22,0.18)' : 'none',
              }}
            >
              {s}×{s}
            </button>
          )
        })}
      </div>
    </div>
  )
}
