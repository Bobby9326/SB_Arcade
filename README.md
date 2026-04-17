# 🎮 MiniHub — Mini Games & Tools Portfolio

A modern web app portfolio featuring mini games and creative tools, built with React + TypeScript + Tailwind CSS.

## 🚀 Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** — utility-first styling
- **React Router v6** — client-side routing
- **Vite** — build tool

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons, etc.)
├── components/
│   ├── Navbar.tsx       # Top navigation with theme toggle
│   ├── ThemeToggle.tsx  # Dark/light mode button
│   └── GameCard.tsx     # Reusable card for games & tools
├── contexts/
│   └── ThemeContext.tsx # Global dark/light theme state
├── data/
│   └── cards.ts         # Game & tool metadata
├── hooks/               # Custom React hooks (future use)
├── sections/            # Reusable page sections (future use)
├── features/            # Feature-scoped logic (future use)
├── utils/               # Utility functions (future use)
├── pages/
│   ├── Home.tsx         # ✅ Landing page with all cards
│   ├── Games.tsx        # ✅ Games listing page
│   ├── Tools.tsx        # ✅ Tools listing page
│   ├── games/
│   │   ├── Wordle.tsx        # 🚧 Coming soon
│   │   ├── Footballdle.tsx   # 🚧 Coming soon
│   │   ├── Game24.tsx        # 🚧 Coming soon
│   │   └── TicTacToe.tsx     # 🚧 Coming soon
│   └── tools/
│       ├── PixelArtEditor.tsx    # 🚧 Coming soon
│       └── FIFAStatGenerator.tsx # 🚧 Coming soon
├── App.tsx              # Root app with router
├── App.css
├── index.css            # Global styles + CSS variables
└── main.tsx             # Entry point
```

## 🎨 Theme

| Variable | Dark | Light |
|---|---|---|
| Background | `#0F0F0F` | `#FFF7ED` |
| Card | `#1A1A1A` | `#FFFFFF` |
| Accent | `#F97316` | `#F97316` |
| Text | `#F1F1F1` | `#1F2937` |

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/games` | Games Listing |
| `/tools` | Tools Listing |
| `/games/wordle` | Wordle |
| `/games/footballdle` | Footballdle |
| `/games/game24` | Game 24 |
| `/games/ttt` | Tic Tac Toe |
| `/tools/pixel-art` | Pixel Art Editor |
| `/tools/fifa-stat` | FIFA Stat Generator |

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🚧 Roadmap

- [x] Layout + Navbar + Theme toggle
- [x] Home page with game/tool cards
- [x] Games listing page
- [x] Tools listing page
- [ ] Wordle game
- [ ] Footballdle game
- [ ] Game 24
- [ ] Tic Tac Toe
- [ ] Pixel Art Editor
- [ ] FIFA Stat Generator
