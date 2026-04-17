import type { Position, RolledStat } from '../types/fifastat.types'
import { STAT_GROUPS } from '../constants/statGroups'
import { POSITION_WEIGHTS } from '../constants/positionWeights'

/** Returns a map of { groupKey → average value } for the given stats */
export function calcGroupAvgs(stats: RolledStat[]): Record<string, number> {
  const statMap = Object.fromEntries(stats.map(s => [s.key, s.value]))
  const result: Record<string, number> = {}

  for (const group of STAT_GROUPS) {
    const values = group.stats
      .map(k => statMap[k])
      .filter((v): v is number => v !== undefined)

    result[group.key] = values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0
  }

  return result
}

/** Calculates overall rating (0-99) as a weighted average of group averages */
export function calcOverall(position: Position, stats: RolledStat[]): number {
  const weights  = POSITION_WEIGHTS[position]
  const groupAvg = calcGroupAvgs(stats)

  let totalWeight = 0
  let weightedSum = 0

  for (const [group, w] of Object.entries(weights)) {
    const avg = groupAvg[group] ?? 0
    weightedSum  += avg * w
    totalWeight  += w
  }

  return Math.round(weightedSum / totalWeight)
}
