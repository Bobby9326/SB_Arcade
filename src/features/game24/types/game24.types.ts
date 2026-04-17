export type GameStatus = 'playing' | 'won' | 'revealed'

export type Operator = '+' | '-' | '×' | '÷'

/** A token placed by clicking a number card */
export interface NumberToken {
  type:      'number'
  value:     string   // the numeric value as a string, e.g. "8"
  cardIndex: number   // which of the 4 card slots (0-3)
}

/** An operator (+  -  ×  ÷) or parenthesis (  )  ) */
export interface SymbolToken {
  type:  'symbol'
  value: string
}

export type ExprToken = NumberToken | SymbolToken
