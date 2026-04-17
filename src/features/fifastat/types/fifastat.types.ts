export type Position =
  | 'LW' | 'RW' | 'LM' | 'RM' | 'ST'
  | 'CAM' | 'CM' | 'CDM'
  | 'LB' | 'RB' | 'CB' | 'GK'

export type StatType = 'core' | 'secondary' | 'gk' | 'special'

export interface StatDef {
  key:   string
  label: string
  type:  StatType
  base:  number
}

export interface PositionData {
  position: Position
  stats:    StatDef[]
  weakFoot: number   // base (1-5)
}

export interface RolledStat {
  key:   string
  label: string
  base:  number
  value: number   // randomized result
}

export interface RolledResult {
  position:  Position
  stats:     RolledStat[]
  weakFoot:  RolledStat
  overall:   number
}

export type Mode = 'random' | 'pick'
