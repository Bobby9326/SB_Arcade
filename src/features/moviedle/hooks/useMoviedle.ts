import { useState, useEffect, useCallback, useMemo } from 'react'
import type { MovieDetails, TMDBSearchResult, GuessComparison, GameStatus } from '../types/moviedle.types'
import { fetchPopularMovies, fetchMovieDetails, searchMovies } from '../utils/tmdbApi'
import { compareMovie } from '../utils/compareMovie'
import { MAX_POPULAR_PAGE, SEARCH_DEBOUNCE, DROPDOWN_LIMIT } from '../constants/moviedle.constants'

export interface MoviedleState {
  target:        MovieDetails | null
  guesses:       GuessComparison[]
  gameStatus:    GameStatus
  dropdownItems: TMDBSearchResult[]
  searchQuery:   string
  isSearching:   boolean
  isSubmitting:  boolean
  dropdownOpen:  boolean
  showWin:       boolean
  showGiveUp:    boolean
}

export interface MoviedleActions {
  setSearchQuery:  (q: string) => void
  setDropdownOpen: (open: boolean) => void
  submitGuess:     (movie: TMDBSearchResult) => Promise<void>
  giveUp:          () => void
  newGame:         () => void
}

export function useMoviedle(): MoviedleState & MoviedleActions {
  const [target,       setTarget]       = useState<MovieDetails | null>(null)
  const [guesses,      setGuesses]      = useState<GuessComparison[]>([])
  const [gameStatus,   setGameStatus]   = useState<GameStatus>('loading')
  const [popularList,  setPopularList]  = useState<TMDBSearchResult[]>([])
  const [searchQuery,  setSearchQuery]  = useState('')
  const [searchResults, setSearchResults] = useState<TMDBSearchResult[]>([])
  const [isSearching,  setIsSearching]  = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showWin,      setShowWin]      = useState(false)
  const [showGiveUp,   setShowGiveUp]   = useState(false)

  /* ── Load a new game ── */
  const loadGame = useCallback(async () => {
    setGameStatus('loading')
    setGuesses([])
    setSearchQuery('')
    setShowWin(false)
    setShowGiveUp(false)
    setDropdownOpen(false)

    try {
      // Page 1 for default dropdown suggestions
      const page1 = await fetchPopularMovies(1)
      setPopularList(page1)

      // Random target from pages 1–MAX_POPULAR_PAGE
      const page   = Math.floor(Math.random() * MAX_POPULAR_PAGE) + 1
      const movies = page === 1 ? page1 : await fetchPopularMovies(page)
      const picked = movies[Math.floor(Math.random() * movies.length)]
      const details = await fetchMovieDetails(picked.id)
      setTarget(details)
      setGameStatus('playing')
    } catch (err) {
      console.error('[Moviedle] Failed to load game:', err)
    }
  }, [])

  useEffect(() => { loadGame() }, [loadGame])

  /* ── Debounced search ── */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    const id = setTimeout(async () => {
      try {
        const results = await searchMovies(searchQuery)
        setSearchResults(results)
      } finally {
        setIsSearching(false)
      }
    }, SEARCH_DEBOUNCE)
    return () => clearTimeout(id)
  }, [searchQuery])

  /* ── Derived: already-guessed IDs ── */
  const guessedIds = useMemo(
    () => new Set(guesses.map(g => g.movie.id)),
    [guesses]
  )

  /* ── Dropdown items ── */
  const dropdownItems = useMemo(() => {
    const base = searchQuery.trim() ? searchResults : popularList
    return base.filter(m => !guessedIds.has(m.id)).slice(0, DROPDOWN_LIMIT)
  }, [searchQuery, searchResults, popularList, guessedIds])

  /* ── Submit guess ── */
  const submitGuess = useCallback(async (picked: TMDBSearchResult) => {
    if (!target || isSubmitting || gameStatus !== 'playing') return
    setIsSubmitting(true)
    setDropdownOpen(false)
    setSearchQuery('')
    try {
      const details    = await fetchMovieDetails(picked.id)
      const comparison = compareMovie(details, target)
      setGuesses(prev => [...prev, comparison])
      if (details.id === target.id) {
        setGameStatus('won')
        setTimeout(() => setShowWin(true), 500)
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [target, isSubmitting, gameStatus])

  /* ── Give up ── */
  const giveUp = useCallback(() => {
    if (gameStatus !== 'playing') return
    setGameStatus('lost')
    setShowGiveUp(true)
  }, [gameStatus])

  return {
    target, guesses, gameStatus, dropdownItems,
    searchQuery, isSearching, isSubmitting,
    dropdownOpen, showWin, showGiveUp,
    setSearchQuery, setDropdownOpen,
    submitGuess, giveUp, newGame: loadGame,
  }
}
