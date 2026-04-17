import { useEffect }           from 'react'
import { usePixelArt }         from '../../features/pixelart/hooks/usePixelArt'
import { PixelCanvas }         from '../../features/pixelart/components/PixelCanvas'
import { PixelToolbar }        from '../../features/pixelart/components/PixelToolbar'
import { PixelPalette }        from '../../features/pixelart/components/PixelPalette'
import { PixelSizeSelector }   from '../../features/pixelart/components/PixelSizeSelector'
import { PixelActionBar }      from '../../features/pixelart/components/PixelActionBar'
import type { GridSize }       from '../../features/pixelart/types/pixelart.types'

const PAE_STYLES = `
  @keyframes pae-slide-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pae-toast-in {
    from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.95); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0)   scale(1); }
  }
`

export default function PixelArtEditor() {
  const {
    grid, gridSize, tool, activeColor,
    canUndo, canRedo, isProcessing, toastMsg,
    setTool, setColor, setGridSize,
    commitStroke, undo, redo, clear,
    uploadImage, download, copy,
  } = usePixelArt()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); return }
      if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); return }
      if (!e.ctrlKey && !e.altKey) {
        if (e.key === 'p' || e.key === 'P') setTool('pen')
        if (e.key === 'f' || e.key === 'F') setTool('fill')
        if (e.key === 'e' || e.key === 'E') setTool('eraser')
        if (e.key === 'i' || e.key === 'I') setTool('eyedropper')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo, setTool])

  return (
    <div
      className="grid-bg"
      style={{
        minHeight:     '100vh',
        background:    'var(--bg-primary)',
        paddingTop:    '5.5rem',
        paddingBottom: '3rem',
        paddingLeft:   '1rem',
        paddingRight:  '1rem',
      }}
    >
      <style>{PAE_STYLES}</style>

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position:      'fixed',
          top:           88,
          left:          '50%',
          transform:     'translateX(-50%)',
          zIndex:        200,
          padding:       '8px 22px',
          background:    'rgba(15,15,15,0.95)',
          border:        '1px solid rgba(249,115,22,0.4)',
          borderRadius:  99,
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.52rem',
          letterSpacing: '0.14em',
          color:         'var(--accent)',
          whiteSpace:    'nowrap',
          animation:     'pae-toast-in 0.22s ease both',
          boxShadow:     '0 4px 24px rgba(0,0,0,0.6)',
        }}>
          {toastMsg}
        </div>
      )}

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', animation: 'pae-slide-up 0.5s ease both' }}>
          <div style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.5rem',
            letterSpacing: '0.38em',
            color:         'var(--text-muted)',
            marginBottom:  '0.35rem',
          }}>
            SB ARCADE · TOOLS
          </div>
          <h1
            className="gradient-text"
            style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      'clamp(1.8rem, 5vw, 2.8rem)',
              fontWeight:    900,
              letterSpacing: '0.18em',
              margin:        0,
              lineHeight:    1,
            }}
          >
            PIXEL ART
          </h1>
          <p style={{
            fontFamily:    'Rajdhani, sans-serif',
            fontSize:      '0.78rem',
            color:         'var(--text-muted)',
            letterSpacing: '0.14em',
            marginTop:     '0.4rem',
            textTransform: 'uppercase',
          }}>
            Draw · Fill · Export PNG
          </p>
        </div>

        {/* Main layout: canvas + sidebar */}
        <div style={{
          display:   'flex',
          gap:       '1.25rem',
          alignItems: 'flex-start',
          flexWrap:  'wrap',
        }}>

          {/* ── Canvas panel ── */}
          <div style={{
            flex:      '1 1 320px',
            minWidth:  0,
            animation: 'pae-slide-up 0.5s 0.08s ease both',
          }}>
            <div style={{
              background:   'rgba(255,255,255,0.015)',
              border:       '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding:      '12px',
            }}>
              <PixelCanvas
                grid={grid}
                gridSize={gridSize}
                tool={tool}
                activeColor={activeColor}
                onStrokeEnd={commitStroke}
                onPickColor={color => { setColor(color); setTool('pen') }}
              />

              {/* Canvas info bar */}
              <div style={{
                display:       'flex',
                justifyContent: 'space-between',
                alignItems:    'center',
                marginTop:     8,
                padding:       '4px 4px 0',
              }}>
                <span style={{
                  fontFamily:    'Orbitron, monospace',
                  fontSize:      '0.44rem',
                  color:         'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}>
                  {gridSize}×{gridSize} · PNG 512×512
                </span>
                <span style={{
                  fontFamily:    'Orbitron, monospace',
                  fontSize:      '0.44rem',
                  color:         'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {tool}
                </span>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div style={{
            width:     220,
            flexShrink: 0,
            display:   'flex',
            flexDirection: 'column',
            gap:       10,
            animation: 'pae-slide-up 0.5s 0.14s ease both',
          }}>
            <PixelSizeSelector
              gridSize={gridSize}
              onSizeChange={s => setGridSize(s as GridSize)}
            />

            <PixelToolbar
              tool={tool}
              canUndo={canUndo}
              canRedo={canRedo}
              onTool={setTool}
              onUndo={undo}
              onRedo={redo}
              onClear={clear}
            />

            <PixelPalette
              activeColor={activeColor}
              onColorChange={c => {
                setColor(c)
                if (c !== '') setTool('pen')
              }}
            />

            <PixelActionBar
              isProcessing={isProcessing}
              onUpload={uploadImage}
              onCopy={copy}
              onDownload={download}
            />
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div style={{
          marginTop:  '1.5rem',
          textAlign:  'center',
          fontFamily: 'Rajdhani, sans-serif',
          fontSize:   '0.72rem',
          color:      'var(--text-muted)',
          letterSpacing: '0.06em',
          animation:  'pae-slide-up 0.5s 0.22s ease both',
        }}>
          Ctrl+Z undo · Ctrl+Y redo · P pen · F fill · E erase · I eyedropper
        </div>
      </div>
    </div>
  )
}
