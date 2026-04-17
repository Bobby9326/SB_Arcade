import type { TMDBSearchResult, MovieDetails } from '../types/moviedle.types'

const API_KEY = import.meta.env.VITE_TMDB_TOKEN as string
const BASE    = 'https://api.themoviedb.org/3'

function url(path: string, params: Record<string, string | number> = {}): string {
  const q = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...Object.fromEntries(Object.entries(params).map(([k,v]) => [k, String(v)])) })
  return `${BASE}${path}?${q}`
}

export async function fetchPopularMovies(page: number): Promise<TMDBSearchResult[]> {
  const res  = await fetch(url('/movie/popular', { page }))
  const data = await res.json()
  return data.results ?? []
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const res = await fetch(url(`/movie/${id}`))
  return res.json()
}

export async function searchMovies(query: string): Promise<TMDBSearchResult[]> {
  const res  = await fetch(url('/search/movie', { query, include_adult: 'false' }))
  const data = await res.json()
  return data.results ?? []
}
