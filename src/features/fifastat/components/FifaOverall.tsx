import type { RolledResult } from '../types/fifastat.types'

interface FifaOverallProps {
  result: RolledResult
}

function overallColor(v: number) {
  if (v >= 90) return '#fbbf24'
  if (v >= 80) return '#22c55e'
  if (v >= 70) return '#84cc16'
  if (v >= 60) return '#eab308'
  return '#f97316'
}

function overallGrade(v: number) {
  if (v >= 90) return 'WORLD CLASS'
  if (v >= 85) return 'ELITE'
  if (v >= 80) return 'TOP TIER'
  if (v >= 75) return 'STRONG'
  if (v >= 70) return 'DECENT'
  if (v >= 60) return 'AVERAGE'
  return 'BELOW AVG'
}

export function FifaOverall({ result }: FifaOverallProps) {
  const c = overallColor(result.overall)

  return (
    <div style={{
      background:   'rgba(255,255,255,0.03)',
      border:       `1px solid ${c}44`,
      borderRadius: 14,
      padding:      '20px 24px',
      display:      'flex',
      alignItems:   'center',
      gap:          24,
      boxShadow:    `0 0 40px ${c}18`,
      marginBottom: 16,
    }}>
      {/* Overall ring */}
      <div style={{
        width:          90,
        height:         90,
        borderRadius:   '50%',
        border:         `3px solid ${c}`,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        background:     `radial-gradient(circle, ${c}18 0%, transparent 70%)`,
        flexShrink:     0,
        boxShadow:      `0 0 24px ${c}44`,
      }}>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '1.8rem',
          fontWeight:    900,
          color:         c,
          lineHeight:    1,
        }}>
          {result.overall}
        </div>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.32rem',
          letterSpacing: '0.18em',
          color:         'var(--text-muted)',
          marginTop:     2,
        }}>
          OVR
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '1.4rem',
          fontWeight:    900,
          color:         'var(--text-primary)',
          letterSpacing: '0.12em',
          lineHeight:    1,
        }}>
          {result.position}
        </div>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.44rem',
          letterSpacing: '0.2em',
          color:         c,
          marginTop:     4,
        }}>
          {overallGrade(result.overall)}
        </div>

        {/* Weak foot */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        8,
          marginTop:  10,
        }}>
          <div style={{
            fontFamily:    'Orbitron, monospace',
            fontSize:      '0.38rem',
            letterSpacing: '0.14em',
            color:         'var(--text-muted)',
          }}>
            WEAK FOOT
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {[1,2,3,4,5].map(i => (
              <div
                key={i}
                style={{
                  width:        10,
                  height:       10,
                  borderRadius: '50%',
                  background:   i <= result.weakFoot.value ? '#f97316' : 'rgba(255,255,255,0.12)',
                  border:       '1px solid rgba(255,255,255,0.15)',
                  boxShadow:    i <= result.weakFoot.value ? '0 0 6px #f9731688' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
