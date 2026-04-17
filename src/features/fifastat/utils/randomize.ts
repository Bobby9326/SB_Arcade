import type { StatDef, RolledStat, RolledResult, Position } from '../types/fifastat.types'
import positionStats from '../data/positionStats.json'
import { ALL_POSITIONS } from '../constants/positionWeights'
import { calcOverall } from './calcOverall'

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(v)))
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomizeStat(stat: StatDef): RolledStat {
  let value: number

  if (stat.type === 'gk') {
    // Non-GK position: gk stats always 10–20
    value = randInt(10, 20)
  } else if (stat.type === 'core') {
    value = clamp(stat.base + randInt(-15, 15), 25, 99)
  } else {
    // secondary
    const minCap = stat.base < 40 ? 10 : 25
    value = clamp(stat.base + randInt(-30, 30), minCap, 99)
  }

  return { key: stat.key, label: stat.label, base: stat.base, value }
}

export function randomizeWeakFoot(base: number): RolledStat {
  // Bell curve via sum of 2 dice: delta = -2 to +2
  // Probability: ±2=11%, ±1=22%, 0=33%
  const delta = randInt(-1, 1) + randInt(-1, 1)
  const value = clamp(base + delta, 1, 5)
  return { key: 'weakFoot', label: 'Weak Foot', base, value }
}

export function rollPosition(position: Position): RolledResult {
  const posData = (positionStats as Array<{ position: string; stats: StatDef[]; weakFoot: number }>)
    .find(p => p.position === position)

  if (!posData) throw new Error(`Unknown position: ${position}`)

  const isGK = position === 'GK'

  const stats: RolledStat[] = posData.stats.map(stat => {
    // GK position: gk-typed stats use core range
    if (isGK && stat.type === 'core') {
      return {
        key:   stat.key,
        label: stat.label,
        base:  stat.base,
        value: clamp(stat.base + randInt(-15, 15), 25, 99),
      }
    }
    return randomizeStat(stat)
  })

  const weakFoot = randomizeWeakFoot(posData.weakFoot)
  const overall  = calcOverall(position, stats)

  return { position, stats, weakFoot, overall }
}

export function rollRandom(): RolledResult {
  const pos = ALL_POSITIONS[Math.floor(Math.random() * ALL_POSITIONS.length)]

  const posData = (positionStats as Array<{ position: string; stats: StatDef[]; weakFoot: number }>)
    .find(p => p.position === pos)!

  const stats: RolledStat[] = posData.stats.map(stat => ({
    key:   stat.key,
    label: stat.label,
    base:  stat.base,
    value: stat.type === 'gk' ? randInt(1, 20) : randInt(1, 99),
  }))

  const weakFoot: RolledStat = {
    key:   'weakFoot',
    label: 'Weak Foot',
    base:  posData.weakFoot,
    value: randInt(1, 5),
  }

  const overall = calcOverall(pos, stats)

  return { position: pos, stats, weakFoot, overall }
}