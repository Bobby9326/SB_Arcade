import { useRef } from 'react'
import { DEFAULT_PALETTE } from '../constants/pixelart.constants'

interface PixelPaletteProps {
  activeColor: string
  onColorChange: (c: string) => void
}

export function PixelPalette({ activeColor, onColorChange }: PixelPaletteProps) {
  const pickerRef = useRef<HTMLInputElement>(null)

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
        PALETTE
      </div>

      {/* Active colour preview + custom picker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width:        40,
          height:       40,
          borderRadius: 8,
          background:   activeColor,
          border:       '2px solid rgba(255,255,255,0.2)',
          flexShrink:   0,
          boxShadow:    `0 0 12px ${activeColor}55`,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'Orbitron, monospace',
            fontSize:   '0.55rem',
            color:      'var(--text-primary)',
            letterSpacing: '0.06em',
          }}>
            {activeColor.toUpperCase()}
          </div>
          <button
            onClick={() => pickerRef.current?.click()}
            style={{
              marginTop:     4,
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.4rem',
              letterSpacing: '0.14em',
              padding:       '3px 10px',
              background:    'rgba(255,255,255,0.05)',
              border:        '1px solid rgba(255,255,255,0.12)',
              borderRadius:  5,
              color:         'var(--text-secondary)',
              cursor:        'pointer',
            }}
          >
            CUSTOM ⊕
          </button>
          {/* Hidden native colour picker */}
          <input
            ref={pickerRef}
            type="color"
            value={activeColor}
            onChange={e => onColorChange(e.target.value)}
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
          />
        </div>
      </div>

      {/* Swatch grid: 6 cols × 4 rows */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 5 }}>
        {DEFAULT_PALETTE.map(color => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            title={color}
            style={{
              width:        '100%',
              aspectRatio:  '1',
              borderRadius: 5,
              background:   color,
              border:       activeColor === color
                ? '2px solid rgba(255,255,255,0.85)'
                : '1px solid rgba(255,255,255,0.1)',
              cursor:       'pointer',
              transition:   'transform 0.1s ease, border 0.1s ease',
              boxShadow:    activeColor === color ? `0 0 8px ${color}88` : 'none',
              transform:    activeColor === color ? 'scale(1.15)' : 'scale(1)',
            }}
          />
        ))}

        {/* Transparent swatch */}
        <button
          onClick={() => onColorChange('')}
          title="Transparent (eraser)"
          style={{
            width:        '100%',
            aspectRatio:  '1',
            borderRadius: 5,
            background:   'repeating-conic-gradient(#aaa 0% 25%, #666 0% 50%) 0 0 / 8px 8px',
            border:       activeColor === ''
              ? '2px solid rgba(255,255,255,0.85)'
              : '1px solid rgba(255,255,255,0.1)',
            cursor:       'pointer',
            transition:   'transform 0.1s ease',
            transform:    activeColor === '' ? 'scale(1.15)' : 'scale(1)',
          }}
        />
      </div>
    </div>
  )
}
