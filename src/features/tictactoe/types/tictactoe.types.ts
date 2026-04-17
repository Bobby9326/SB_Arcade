export type Cell       = 'X' | 'O' | null
export type Sym        = 'X' | 'O'
export type Turn       = 'player' | 'bot' | null
export type GameStatus = 'idle' | 'flipping' | 'playing' | 'won' | 'lost' | 'draw'

export interface Scores { w: number; l: number; d: number }
