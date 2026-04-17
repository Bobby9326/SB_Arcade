export interface StatGroup {
  key:   string
  label: string
  color: string
  stats: string[]   // stat keys in this group
}

export const STAT_GROUPS: StatGroup[] = [
  {
    key:   'pace',
    label: 'PACE',
    color: '#f59e0b',
    stats: ['acceleration', 'sprintSpeed'],
  },
  {
    key:   'shooting',
    label: 'SHOOTING',
    color: '#ef4444',
    stats: ['positioning', 'finishing', 'shotPower', 'longShots', 'volleys', 'penalties'],
  },
  {
    key:   'passing',
    label: 'PASSING',
    color: '#22c55e',
    stats: ['vision', 'crossing', 'fkAccuracy', 'shortPassing', 'longPassing', 'curve'],
  },
  {
    key:   'dribbling',
    label: 'DRIBBLING',
    color: '#3b82f6',
    stats: ['agility', 'balance', 'reactions', 'ballControl', 'dribbling', 'composure'],
  },
  {
    key:   'defending',
    label: 'DEFENDING',
    color: '#8b5cf6',
    stats: ['interceptions', 'headingAccuracy', 'defensiveAware', 'standingTackle', 'slidingTackle'],
  },
  {
    key:   'physical',
    label: 'PHYSICAL',
    color: '#f97316',
    stats: ['jumping', 'stamina', 'strength', 'aggression'],
  },
  {
    key:   'goalkeeping',
    label: 'GOALKEEPING',
    color: '#06b6d4',
    stats: ['gkDiving', 'gkHandling', 'gkKicking', 'gkReflexes', 'gkPositioning'],
  },
]
