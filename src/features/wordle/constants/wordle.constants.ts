export const WORD_LENGTH  = 5
export const MAX_ROWS     = 6
export const FLIP_DURATION = 350   // ms per tile flip
export const FLIP_GAP     = 120    // ms between each tile flip start

export const KEYBOARD_ROWS: string[][] = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
]

export const WIN_MESSAGES: string[] = [
  'Genius!',
  'Magnificent!',
  'Impressive!',
  'Splendid!',
  'Great!',
  'Phew!',
]

export const RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word?length=5'
export const DICTIONARY_API  = 'https://api.dictionaryapi.dev/api/v2/entries/en'

export const STATUS_PRIORITY: Record<string, number> = {
  correct: 3,
  present: 2,
  absent:  1,
  tbd:     0,
  '':      0,
}
