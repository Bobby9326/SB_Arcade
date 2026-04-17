/** Columns CSS grid template — used by both header row and guess rows */
export const CELL_GRID =
  '72px minmax(110px,1fr) minmax(130px,1.4fr) 80px 82px 88px 96px'

export const MAX_POPULAR_PAGE  = 5
export const SEARCH_DEBOUNCE   = 400   // ms
export const DROPDOWN_LIMIT    = 8

export const IMG_W92  = 'https://image.tmdb.org/t/p/w92'
export const IMG_W342 = 'https://image.tmdb.org/t/p/w342'
export const IMG_W500 = 'https://image.tmdb.org/t/p/w500'

export const COLUMN_LABELS = [
  'เรื่อง',
  'Original Title',
  'Genres',
  'Country',
  'Year',
  'Runtime',
  'Revenue',
] as const
