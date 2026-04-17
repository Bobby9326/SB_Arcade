import type { Position } from '../types/fifastat.types'

export const POSITION_WEIGHTS: Record<Position, Record<string, number>> = {
  ST:  { pace: 0.15, shooting: 0.45, passing: 0.05, dribbling: 0.15, defending: 0.01, physical: 0.15, goalkeeping: 0.04 },
  LW:  { pace: 0.25, shooting: 0.20, passing: 0.15, dribbling: 0.25, defending: 0.02, physical: 0.10, goalkeeping: 0.03 },
  RW:  { pace: 0.25, shooting: 0.20, passing: 0.15, dribbling: 0.25, defending: 0.02, physical: 0.10, goalkeeping: 0.03 },
  LM:  { pace: 0.20, shooting: 0.15, passing: 0.20, dribbling: 0.22, defending: 0.05, physical: 0.15, goalkeeping: 0.03 },
  RM:  { pace: 0.20, shooting: 0.15, passing: 0.20, dribbling: 0.22, defending: 0.05, physical: 0.15, goalkeeping: 0.03 },
  CAM: { pace: 0.10, shooting: 0.20, passing: 0.28, dribbling: 0.25, defending: 0.03, physical: 0.11, goalkeeping: 0.03 },
  CM:  { pace: 0.10, shooting: 0.12, passing: 0.28, dribbling: 0.20, defending: 0.12, physical: 0.15, goalkeeping: 0.03 },
  CDM: { pace: 0.08, shooting: 0.06, passing: 0.18, dribbling: 0.14, defending: 0.30, physical: 0.21, goalkeeping: 0.03 },
  LB:  { pace: 0.20, shooting: 0.04, passing: 0.15, dribbling: 0.12, defending: 0.28, physical: 0.18, goalkeeping: 0.03 },
  RB:  { pace: 0.20, shooting: 0.04, passing: 0.15, dribbling: 0.12, defending: 0.28, physical: 0.18, goalkeeping: 0.03 },
  CB:  { pace: 0.08, shooting: 0.02, passing: 0.08, dribbling: 0.06, defending: 0.40, physical: 0.33, goalkeeping: 0.03 },
  // GK: reduced goalkeeping 0.82→0.65, physical 0.05→0.18 to prevent overall inflation
  GK:  { pace: 0.02, shooting: 0.01, passing: 0.06, dribbling: 0.06, defending: 0.02, physical: 0.18, goalkeeping: 0.65 },
}

export const ALL_POSITIONS: Position[] = [
  'ST', 'LW', 'RW', 'LM', 'RM', 'CAM', 'CM', 'CDM', 'LB', 'RB', 'CB', 'GK',
]

export const POSITION_ROWS: Position[][] = [
  ['LW', 'ST', 'RW'],
  ['CAM'],
  ['LM', 'CM', 'RM'],
  ['CDM'],
  ['LB', 'CB', 'RB'],
  ['GK'],
]