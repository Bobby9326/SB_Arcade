import type { RolledStat } from '../types/fifastat.types'
import type { StatGroup } from '../constants/statGroups'
import { FifaStatBar } from './FifaStatBar'

interface FifaStatGroupProps {
  group:    StatGroup
  stats:    RolledStat[]
  groupAvg: number
}

export function FifaStatGroup({ group, stats, groupAvg }: FifaStatGroupProps) {
  const groupStats = stats.filter(s => group.stats.includes(s.key))
  if (groupStats.length === 0) return null

  return (
    <div style={{
      background:   'rgba(255,255,255,0.025)',
      border:       `1px solid ${group.color}22`,
      borderRadius: 10,
      padding:      '12px 14px',
      marginBottom: 10,
    }}>
      {/* Group header */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   10,
        paddingBottom:  8,
        borderBottom:   `1px solid ${group.color}33`,
      }}>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.5rem',
          fontWeight:    700,
          letterSpacing: '0.2em',
          color:         group.color,
        }}>
          {group.label}
        </div>
        <div style={{
          fontFamily:    'Orbitron, monospace',
          fontSize:      '0.72rem',
          fontWeight:    900,
          color:         group.color,
          background:    `${group.color}18`,
          padding:       '2px 10px',
          borderRadius:  20,
          border:        `1px solid ${group.color}44`,
        }}>
          {groupAvg}
        </div>
      </div>

      {/* Stat bars */}
      {groupStats.map(s => (
        <FifaStatBar key={s.key} stat={s} />
      ))}
    </div>
  )
}
