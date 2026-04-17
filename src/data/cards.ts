export interface CardItem {
  id: string
  title: string
  description: string
  path: string
  icon: string
  category: 'game' | 'tool'
  badge: string
  color: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
}

export const gamesData: CardItem[] = [
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Guess the hidden 5-letter word in 6 tries. Each guess reveals clues about letter placement.',
    path: '/games/wordle',
    icon: '🟩',
    category: 'game',
    badge: 'Word Game',
    color: '#22C55E',
    difficulty: 'Medium',
    tags: ['Word', 'Puzzle', 'Daily'],
  },
  {
    id: 'moviedle',
    title: 'Moviedle',
    description: 'Guess the mystery movie from genre, country, year, runtime and revenue clues.',
    path: '/games/moviedle',
    icon: '🎬',
    category: 'game',
    badge: 'Movies',
    color: '#3B82F6',
    difficulty: 'Hard',
    tags: ['Movies', 'Trivia', 'Guessing'],
  },
  {
    id: 'game24',
    title: 'Game 24',
    description: 'Use four numbers and basic arithmetic operations to reach the target of 24.',
    path: '/games/game24',
    icon: '🔢',
    category: 'game',
    badge: 'Math',
    color: '#F97316',
    difficulty: 'Hard',
    tags: ['Math', 'Numbers', 'Puzzle'],
  },
  {
    id: 'ttt',
    title: 'Tic Tac Toe',
    description: 'Classic X and O battle. Play against a friend or challenge the AI opponent.',
    path: '/games/ttt',
    icon: '❌',
    category: 'game',
    badge: 'Classic',
    color: '#EC4899',
    difficulty: 'Medium',
    tags: ['Classic', '2-Player', 'Strategy'],
  },
]

export const toolsData: CardItem[] = [
  {
    id: 'pixel-art',
    title: 'Pixel Art Editor',
    description: 'Create stunning pixel art with a full-featured editor. Draw, fill, export and share your creations.',
    path: '/tools/pixel-art',
    icon: '🎨',
    category: 'tool',
    badge: 'Creative',
    color: '#A855F7',
    tags: ['Art', 'Design', 'Creative'],
  },
  {
    id: 'fifa-stat',
    title: 'FIFA Stat Generator',
    description: 'Generate custom FIFA-style player stat cards with ratings, positions, and detailed attributes.',
    path: '/tools/fifa-stat',
    icon: '📊',
    category: 'tool',
    badge: 'Generator',
    color: '#14B8A6',
    tags: ['FIFA', 'Football', 'Stats'],
  },
]
