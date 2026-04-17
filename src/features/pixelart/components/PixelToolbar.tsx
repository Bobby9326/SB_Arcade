import type { Tool } from '../types/pixelart.types'

interface PixelToolbarProps {
  tool:     Tool
  canUndo:  boolean
  canRedo:  boolean
  onTool:   (t: Tool) => void
  onUndo:   () => void
  onRedo:   () => void
  onClear:  () => void
}

const TOOLS: { id: Tool; icon: string; label: string }[] = [
  { id: 'pen',        icon: '✏',  label: 'PEN'   },
  { id: 'fill',       icon: '◈',  label: 'FILL'  },
  { id: 'eraser',     icon: '⊟',  label: 'ERASE' },
  { id: 'eyedropper', icon: '⊕',  label: 'PICK'  },
]

export function PixelToolbar({ tool, canUndo, canRedo, onTool, onUndo, onRedo, onClear }: PixelToolbarProps) {

  function ToolBtn({ id, icon, label }: typeof TOOLS[number]) {
    const active = tool === id
    return (
      <button
        onClick={() => onTool(id)}
        title={label}
        style={{
          flex:          1,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           3,
          padding:       '10px 6px',
          background:    active ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.03)',
          border:        `1px solid ${active ? 'rgba(249,115,22,0.55)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius:  8,
          cursor:        'pointer',
          transition:    'all 0.15s ease',
          boxShadow:     active ? '0 0 14px rgba(249,115,22,0.2)' : 'none',
        }}
      >
        <span style={{ fontSize: '1.1rem', lineHeight: 1, color: active ? 'var(--accent)' : 'var(--text-secondary)' }}>
          {icon}
        </span>
        <span style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.38rem',
          letterSpacing: '0.14em',
          color:         active ? 'var(--accent)' : 'var(--text-muted)',
          fontWeight:    700,
        }}>
          {label}
        </span>
      </button>
    )
  }

  function CtrlBtn({
    icon, label, onClick, disabled = false, danger = false,
  }: { icon: string; label: string; onClick: () => void; disabled?: boolean; danger?: boolean }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        title={label}
        style={{
          flex:          1,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           3,
          padding:       '8px 6px',
          background:    danger ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.03)',
          border:        `1px solid ${danger ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius:  8,
          cursor:        disabled ? 'default' : 'pointer',
          opacity:       disabled ? 0.35 : 1,
          transition:    'all 0.15s ease',
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1, color: danger ? '#F87171' : 'var(--text-secondary)' }}>
          {icon}
        </span>
        <span style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.38rem',
          letterSpacing: '0.14em',
          color:         danger ? '#F87171' : 'var(--text-muted)',
          fontWeight:    700,
        }}>
          {label}
        </span>
      </button>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Drawing tools */}
      <div style={{
        background:   'rgba(255,255,255,0.02)',
        border:       '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding:      8,
      }}>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.42rem',
          letterSpacing: '0.22em',
          color:         'var(--text-muted)',
          marginBottom:  6,
          paddingLeft:   2,
        }}>
          TOOLS
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {TOOLS.map(t => <ToolBtn key={t.id} {...t} />)}
        </div>
      </div>

      {/* History + Clear */}
      <div style={{
        background:   'rgba(255,255,255,0.02)',
        border:       '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding:      8,
      }}>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.42rem',
          letterSpacing: '0.22em',
          color:         'var(--text-muted)',
          marginBottom:  6,
          paddingLeft:   2,
        }}>
          HISTORY
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <CtrlBtn icon="↩" label="UNDO"  onClick={onUndo}  disabled={!canUndo} />
          <CtrlBtn icon="↪" label="REDO"  onClick={onRedo}  disabled={!canRedo} />
          <CtrlBtn icon="✕" label="CLEAR" onClick={onClear} danger />
        </div>
      </div>
    </div>
  )
}
