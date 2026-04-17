import { useRef } from 'react'

interface PixelActionBarProps {
  isProcessing: boolean
  onUpload:     (file: File) => void
  onCopy:       () => void
  onDownload:   () => void
}

export function PixelActionBar({ isProcessing, onUpload, onCopy, onDownload }: PixelActionBarProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''   // reset so same file can be re-selected
  }

  const actions = [
    {
      icon:    '⬆',
      label:   isProcessing ? 'LOADING…' : 'UPLOAD',
      onClick: () => fileRef.current?.click(),
      disabled: isProcessing,
      accent:  false,
    },
    {
      icon:    '📋',
      label:   'COPY',
      onClick: onCopy,
      disabled: false,
      accent:  false,
    },
    {
      icon:    '⬇',
      label:   'DOWNLOAD',
      onClick: onDownload,
      disabled: false,
      accent:  true,
    },
  ]

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
        EXPORT
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {actions.map(a => (
          <button
            key={a.label}
            onClick={a.onClick}
            disabled={a.disabled}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           8,
              padding:       '9px 12px',
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.48rem',
              fontWeight:    700,
              letterSpacing: '0.14em',
              background:    a.accent ? 'var(--accent-dim)' : 'rgba(255,255,255,0.04)',
              border:        `1px solid ${a.accent ? 'var(--border-accent)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius:  8,
              color:         a.accent ? 'var(--accent)' : 'var(--text-secondary)',
              cursor:        a.disabled ? 'default' : 'pointer',
              opacity:       a.disabled ? 0.5 : 1,
              transition:    'all 0.15s ease',
              boxShadow:     a.accent ? '0 0 14px var(--accent-dim)' : 'none',
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <p style={{
        fontFamily:  'Rajdhani, sans-serif',
        fontSize:    '0.68rem',
        color:       'var(--text-muted)',
        lineHeight:  1.5,
        marginTop:   10,
        marginBottom: 0,
      }}>
        PNG export with transparent background.
        Upload any image to pixelate it.
      </p>
    </div>
  )
}
