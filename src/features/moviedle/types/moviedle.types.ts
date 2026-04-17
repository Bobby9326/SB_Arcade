export interface TMDBSearchResult {
  id:             number
  title:          string
  original_title: string
  poster_path:    string | null
  backdrop_path:  string | null
  release_date:   string
  genre_ids:      number[]
}

export interface TMDBGenre {
  id:   number
  name: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name:       string
}

export interface MovieDetails {
  id:                  number
  title:               string
  original_title:      string
  poster_path:         string | null
  backdrop_path:       string | null
  release_date:        string          // "YYYY-MM-DD"
  genres:              TMDBGenre[]
  origin_country:      string[]
  production_countries: ProductionCountry[]
  runtime:             number          // minutes
  revenue:             number          // USD
  overview:            string
  vote_average:        number
}

export type MatchResult    = 'correct' | 'partial' | 'wrong'
export type DirectionResult = 'correct' | 'up' | 'down'

export interface GuessComparison {
  movie:           MovieDetails
  titleMatch:      MatchResult
  genresMatch:     MatchResult
  matchedGenreIds: number[]
  countryMatch:    MatchResult
  yearHint:        DirectionResult
  runtimeHint:     DirectionResult
  revenueHint:     DirectionResult
}

export type GameStatus = 'loading' | 'playing' | 'won' | 'lost'
