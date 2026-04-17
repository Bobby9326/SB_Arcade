interface WordleToastProps {
  msg:     string
  visible: boolean
}

export function WordleToast({ msg, visible }: WordleToastProps) {
  if (!msg) return null

  return (
    <div
      style={{
        position:      'fixed',
        top:           '5.2rem',
        left:          '50%',
        zIndex:        9999,
        background:    'var(--text-primary)',
        color:         'var(--bg-primary)',
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.65rem',
        fontWeight:    700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding:       '10px 22px',
        borderRadius:  10,
        boxShadow:     '0 8px 32px rgba(0,0,0,0.5)',
        animation:     visible
          ? 'wordle-toast-in 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards'
          : 'wordle-toast-out 0.3s ease forwards',
        pointerEvents: 'none',
        whiteSpace:    'nowrap',
      }}
    >
      {msg}
    </div>
  )
}
