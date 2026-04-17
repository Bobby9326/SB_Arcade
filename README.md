# SB Arcade

A modern mini-game and creative-tool collection built with React, TypeScript, and Tailwind CSS. All experiences run entirely in the browser — no backend, no accounts, just play.

---

## Features

### Games

| Game | Description |
|---|---|
| **Wordle** | Guess the hidden 5-letter word in 6 attempts. Color-coded feedback after each guess. |
| **Moviedle** | A movie-guessing game powered by TMDB. Guess the mystery movie from progressively revealed clues. |
| **Game 24** | Given 4 playing cards, use any combination of +, −, ×, ÷ to reach exactly 24. |
| **Tic Tac Toe** | Classic 3×3 board with coin-flip turn order, scoreboard, and keyboard support. |

### Tools

| Tool | Description |
|---|---|
| **Pixel Art Editor** | Grid-based canvas with color palette, multiple brush tools, and PNG export. |
| **FIFA Stat Generator** | Generate randomized FIFA-style player stats with position-weighted overall calculation. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v6 |
| Build Tool | Vite 5 |
| External API | TMDB (Moviedle) |

---

## Project Structure

```
src/
├── components/          # Shared UI components (Navbar, Footer, GameCard, ThemeToggle)
├── contexts/            # Global state (ThemeContext — dark/light mode)
├── data/                # Card metadata for home/listing pages
├── pages/               # Route-level pages
│   ├── Home.tsx
│   ├── Games.tsx
│   ├── Tools.tsx
│   ├── games/           # Page shells for each game
│   └── tools/           # Page shells for each tool
└── features/            # Feature-scoped modules (self-contained)
    ├── wordle/
    ├── moviedle/
    ├── game24/
    ├── tictactoe/
    ├── pixelart/
    └── fifastat/
```

Each feature follows the same internal structure:

```
features/<name>/
├── components/   # UI components for this feature only
├── hooks/        # Custom React hooks
├── types/        # TypeScript interfaces & types
├── utils/        # Pure utility functions
└── constants/    # Constants and configuration
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Home — all cards |
| `/games` | Games listing |
| `/tools` | Tools listing |
| `/games/wordle` | Wordle |
| `/games/moviedle` | Moviedle |
| `/games/game24` | Game 24 |
| `/games/ttt` | Tic Tac Toe |
| `/tools/pixel-art` | Pixel Art Editor |
| `/tools/fifa-stat` | FIFA Stat Generator |

---

## Theme

The app supports dark and light mode via a global `ThemeContext`.

| Token | Dark | Light |
|---|---|---|
| Background | `#0F0F0F` | `#FFF7ED` |
| Card | `#1A1A1A` | `#FFFFFF` |
| Accent | `#F97316` | `#F97316` |
| Text | `#F1F1F1` | `#1F2937` |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/sb-arcade.git
cd sb-arcade

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

> **Moviedle** requires a TMDB API key. Create a `.env.local` file:
> ```
> VITE_TMDB_API_KEY=your_api_key_here
> ```
> Get a free key at [themoviedb.org](https://www.themoviedb.org/settings/api).

---

## Roadmap

- [x] Navbar + Footer + dark/light theme toggle
- [x] Home, Games, and Tools listing pages
- [x] Wordle
- [x] Moviedle (TMDB integration)
- [x] Game 24
- [x] Tic Tac Toe
- [x] Pixel Art Editor
- [x] FIFA Stat Generator
- [ ] Mobile responsiveness pass
- [ ] Persist high scores in localStorage
