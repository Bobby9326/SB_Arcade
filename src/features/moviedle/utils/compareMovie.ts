import type {
  MovieDetails, GuessComparison,
  MatchResult, DirectionResult,
} from '../types/moviedle.types'

function countryList(m: MovieDetails): string[] {
  if (m.origin_country?.length) return m.origin_country
  return m.production_countries?.map(c => c.iso_3166_1) ?? []
}

export function compareMovie(guess: MovieDetails, target: MovieDetails): GuessComparison {
  /* ── Original title ── */
  const titleMatch: MatchResult =
    guess.original_title.trim().toLowerCase() === target.original_title.trim().toLowerCase()
      ? 'correct' : 'wrong'

  /* ── Genres ── */
  const targetGenreIds = new Set(target.genres.map(g => g.id))
  const guessGenreIds  = new Set(guess.genres.map(g => g.id))
  const matchedGenreIds = guess.genres.filter(g => targetGenreIds.has(g.id)).map(g => g.id)
  const genresMatch: MatchResult =
    targetGenreIds.size > 0 &&
    matchedGenreIds.length === targetGenreIds.size &&
    guessGenreIds.size    === targetGenreIds.size
      ? 'correct'
      : matchedGenreIds.length > 0 ? 'partial' : 'wrong'

  /* ── Country ── */
  const targetCountries = new Set(countryList(target))
  const guessCountries  = countryList(guess)
  const countryMatch: MatchResult =
    guessCountries.some(c => targetCountries.has(c)) ? 'correct' : 'wrong'

  /* ── Year ── */
  const tYear = target.release_date ? new Date(target.release_date).getFullYear() : 0
  const gYear = guess.release_date  ? new Date(guess.release_date).getFullYear()  : 0
  const yearHint: DirectionResult =
    tYear === gYear ? 'correct' : tYear > gYear ? 'up' : 'down'

  /* ── Runtime ── */
  const runtimeHint: DirectionResult =
    guess.runtime === target.runtime ? 'correct'
    : target.runtime > guess.runtime ? 'up' : 'down'

  /* ── Revenue ── */
  const revenueHint: DirectionResult =
    guess.revenue === target.revenue ? 'correct'
    : target.revenue > guess.revenue ? 'up' : 'down'

  return {
    movie: guess,
    titleMatch, genresMatch, matchedGenreIds,
    countryMatch, yearHint, runtimeHint, revenueHint,
  }
}
