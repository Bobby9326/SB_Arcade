import { useFifaStat }         from '../../features/fifastat/hooks/useFifaStat'
import { FifaModeSelector }    from '../../features/fifastat/components/FifaModeSelector'
import { FifaPositionGrid }    from '../../features/fifastat/components/FifaPositionGrid'
import { FifaOverall }         from '../../features/fifastat/components/FifaOverall'
import { FifaStatGroup }       from '../../features/fifastat/components/FifaStatGroup'
import { STAT_GROUPS }         from '../../features/fifastat/constants/statGroups'
import { calcGroupAvgs }       from '../../features/fifastat/utils/calcOverall'
import type { Position }       from '../../features/fifastat/types/fifastat.types'

const FSG_STYLES = `
  @keyframes fsg-slide-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fsg-pop {
    0%   { transform: scale(0.92); opacity: 0; }
    60%  { transform: scale(1.03); }
    100% { transform: scale(1);    opacity: 1; }
  }
  @keyframes fsg-spin {
    to { transform: rotate(360deg); }
  }
  .fsg-roll-btn {
    transition: all 0.15s ease !important;
  }
  .fsg-roll-btn:hover:not(:disabled) {
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 30px rgba(249,115,22,0.45) !important;
  }
  .fsg-roll-btn:active:not(:disabled) {
    transform: translateY(0) !important;
  }
`

export default function FIFAStatGenerator() {
  const {
    mode, picked, result, rolling, canRoll,
    pickMode, pickPosition, roll,
  } = useFifaStat()

  const groupAvgs = result ? calcGroupAvgs(result.stats) : {}

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
      <style>{FSG_STYLES}</style>

      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign:  'center',
          marginBottom: '2rem',
          animation:  'fsg-slide-up 0.5s ease both',
        }}>
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
              fontSize:      'clamp(1.6rem, 5vw, 2.6rem)',
              fontWeight:    900,
              letterSpacing: '0.18em',
              margin:        0,
              lineHeight:    1,
            }}
          >
            EA FC STAT GEN
          </h1>
          <p style={{
            fontFamily:    'Rajdhani, sans-serif',
            fontSize:      '0.78rem',
            color:         'var(--text-muted)',
            letterSpacing: '0.14em',
            marginTop:     '0.4rem',
            textTransform: 'uppercase',
          }}>
            Randomize · Compare · Build your player
          </p>
        </div>

        {/* Controls panel */}
        <div style={{
          background:   'rgba(255,255,255,0.02)',
          border:       '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding:      '18px 20px',
          marginBottom: 20,
          animation:    'fsg-slide-up 0.5s 0.08s ease both',
        }}>
          <div style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.42rem',
            letterSpacing: '0.22em',
            color:         'var(--text-muted)',
            marginBottom:  12,
          }}>
            MODE
          </div>

          <FifaModeSelector mode={mode} onSelect={pickMode} />

          {mode === 'pick' && (
            <div style={{ marginTop: 14 }}>
              <FifaPositionGrid picked={picked} onPick={p => pickPosition(p as Position)} />
            </div>
          )}

          {/* Roll button */}
          <button
            className="fsg-roll-btn"
            onClick={roll}
            disabled={!canRoll || rolling}
            style={{
              marginTop:     16,
              width:         '100%',
              padding:       '14px 0',
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.62rem',
              fontWeight:    900,
              letterSpacing: '0.22em',
              background:    canRoll && !rolling
                ? 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(234,88,12,0.9))'
                : 'rgba(255,255,255,0.04)',
              border:        `1px solid ${canRoll && !rolling ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius:  10,
              color:         canRoll && !rolling ? '#fff' : 'var(--text-muted)',
              cursor:        canRoll && !rolling ? 'pointer' : 'default',
              boxShadow:     canRoll && !rolling ? '0 0 24px rgba(249,115,22,0.3)' : 'none',
              display:       'flex',
              alignItems:    'center',
              justifyContent: 'center',
              gap:           10,
            }}
          >
            {rolling ? (
              <>
                <span style={{
                  display:      'inline-block',
                  width:        14,
                  height:       14,
                  border:       '2px solid rgba(255,255,255,0.3)',
                  borderTop:    '2px solid #fff',
                  borderRadius: '50%',
                  animation:    'fsg-spin 0.7s linear infinite',
                }} />
                ROLLING…
              </>
            ) : (
              <>⚽ {mode === 'random' ? 'RANDOM ROLL' : `ROLL ${picked ?? '—'}`}</>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ animation: 'fsg-pop 0.4s ease both' }}>

            {/* Overall card */}
            <FifaOverall result={result} />

            {/* Stat groups — two column layout on wider screens */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap:                 12,
            }}>
              {STAT_GROUPS.map(group => (
                <FifaStatGroup
                  key={group.key}
                  group={group}
                  stats={result.stats}
                  groupAvg={groupAvgs[group.key] ?? 0}
                />
              ))}
            </div>

            {/* Legend */}
            <div style={{
              marginTop:     16,
              padding:       '10px 14px',
              background:    'rgba(255,255,255,0.02)',
              border:        '1px solid rgba(255,255,255,0.05)',
              borderRadius:  8,
              fontFamily:    'Rajdhani, sans-serif',
              fontSize:      '0.72rem',
              color:         'var(--text-muted)',
              display:       'flex',
              gap:           20,
              flexWrap:      'wrap',
            }}>
              <span>Bar: rolled value</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>Light bar: base value</span>
              <span style={{ color: '#22c55e' }}>+N above base</span>
              <span style={{ color: '#ef4444' }}>−N below base</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result && !rolling && (
          <div style={{
            textAlign:  'center',
            padding:    '3rem 1rem',
            animation:  'fsg-slide-up 0.5s 0.16s ease both',
          }}>
            <div style={{
              fontSize:   '3rem',
              marginBottom: 12,
              filter:     'grayscale(0.3)',
            }}>
              ⚽
            </div>
            <div style={{
              fontFamily:    'Orbitron, monospace',
              fontSize:      '0.5rem',
              letterSpacing: '0.2em',
              color:         'var(--text-muted)',
            }}>
              {mode === 'pick' && !picked
                ? 'CHOOSE A POSITION ABOVE'
                : 'PRESS ROLL TO GENERATE STATS'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
