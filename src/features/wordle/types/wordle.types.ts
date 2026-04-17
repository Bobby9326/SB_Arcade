export type TileStatus = '' | 'tbd' | 'correct' | 'present' | 'absent'

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost'

export interface TileColors {
  bg: string
  border: string
  color: string
  shadow: string
}
