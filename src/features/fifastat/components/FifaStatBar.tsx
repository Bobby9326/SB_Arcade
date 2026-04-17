import type { RolledStat } from '../types/fifastat.types'

interface FifaStatBarProps {
  stat: RolledStat
}

function statColor(v: number) {
  if (v >= 85) return '#22c55e'
  if (v >= 70) return '#84cc16'
  if (v >= 55) return '#eab308'
  if (v >= 40) return '#f97316'
  return '#ef4444'
}

export function FifaStatBar({ stat }: FifaStatBarProps) {
  const pct   = Math.round((stat.value / 99) * 100)
  const bPct  = Math.round((stat.base  / 99) * 100)
  const diff  = stat.value - stat.base
  const sign  = diff > 0 ? '+' : ''
  const barC  = statColor(stat.value)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
      {/* Value */}
      <div style={{
        width:         28,
        textAlign:     'right',
        fontFamily:    'Orbitron, monospace',
        fontSize:      '0.62rem',
        fontWeight:    700,
        color:         barC,
        flexShrink:    0,
      }}>
        {stat.value}
      </div>

      {/* Label */}
      <div style={{
        width:         120,
        fontFamily:    'Rajdhani, sans-serif',
        fontSize:      '0.78rem',
        color:         'var(--text-secondary)',
        letterSpacing: '0.04em',
        flexShrink:    0,
        overflow:      'hidden',
        textOverflow:  'ellipsis',
        whiteSpace:    'nowrap',
      }}>
        {stat.label}
      </div>

      {/* Bar track */}
      <div style={{
        flex:          1,
        height:        5,
        background:    'rgba(255,255,255,0.07)',
        borderRadius:  99,
        position:      'relative',
        overflow:      'hidden',
      }}>
        {/* Base marker */}
        <div style={{
          position:  'absolute',
          top:       0,
          left:      0,
          width:     `${bPct}%`,
          height:    '100%',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 99,
        }} />
        {/* Rolled fill */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          width:      `${pct}%`,
          height:     '100%',
          background: barC,
          borderRadius: 99,
          transition:  'width 0.35s ease',
          boxShadow:   `0 0 6px ${barC}66`,
        }} />
      </div>

      {/* Delta */}
      <div style={{
        width:      30,
        textAlign:  'right',
        fontFamily: 'Orbitron, monospace',
        fontSize:   '0.46rem',
        color:      diff > 0 ? '#22c55e' : diff < 0 ? '#ef4444' : 'var(--text-muted)',
        flexShrink: 0,
      }}>
        {diff !== 0 ? `${sign}${diff}` : '—'}
      </div>
    </div>
  )
}

