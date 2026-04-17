interface Game24CardsProps {
  numbers:     number[]
  usedIndices: Set<number>
  onCardClick: (cardIndex: number) => void
  disabled:    boolean
}

export function Game24Cards({
  numbers,
  usedIndices,
  onCardClick,
  disabled,
}: Game24CardsProps) {
  return (
    <div
      style={{
        display:   'flex',
        gap:       '0.85rem',
        animation: 'g24-slide-up 0.5s 0.08s ease both',
      }}
    >
      {numbers.map((num, idx) => {
        const used      = usedIndices.has(idx)
        const clickable = !used && !disabled

        return (
          <div
            key={idx}
            onClick={() => clickable && onCardClick(idx)}
            className={clickable ? 'g24-card' : ''}
            style={{
              width:          'clamp(70px, 15vw, 88px)',
              height:         'clamp(70px, 15vw, 88px)',
              borderRadius:   12,
              border:         `1px solid ${used ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)'}`,
              background:     used
                ? 'rgba(255,255,255,0.02)'
                : 'linear-gradient(145deg, #1E1E1E 0%, #141414 100%)',
              cursor:         clickable ? 'pointer' : 'default',
              opacity:        used ? 0.2 : 1,
              transition:     'all 0.18s ease',
              boxShadow:      used ? 'none' : '0 4px 20px rgba(0,0,0,0.45)',
              userSelect:     'none',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              position:       'relative',
            }}
          >
            <span
              style={{
                fontFamily:  'Orbitron, monospace',
                fontSize:    'clamp(1.8rem, 5vw, 2.4rem)',
                fontWeight:  900,
                color:       used ? '#2A2A2A' : 'var(--text-primary)',
                textShadow:  used ? 'none' : '0 2px 12px rgba(0,0,0,0.5)',
                lineHeight:  1,
              }}
            >
              {num}
            </span>

            {used && (
              <div style={{
                position:       'absolute',
                inset:          0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '1.5rem',
                color:          'rgba(249,115,22,0.3)',
              }}>
                ✓
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
