import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Pages
import Home from './pages/Home'
import Games from './pages/Games'
import Tools from './pages/Tools'

// Game pages (placeholders)
import Wordle from './pages/games/Wordle'
import Moviedle from './pages/games/Moviedle'
import Game24 from './pages/games/Game24'
import TicTacToe from './pages/games/TicTacToe'

// Tool pages (placeholders)
import PixelArtEditor from './pages/tools/PixelArtEditor'
import FIFAStatGenerator from './pages/tools/FIFAStatGenerator'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tools" element={<Tools />} />

          {/* Game sub-pages */}
          <Route path="/games/wordle" element={<Wordle />} />
          <Route path="/games/moviedle" element={<Moviedle />} />
          <Route path="/games/game24" element={<Game24 />} />
          <Route path="/games/ttt" element={<TicTacToe />} />

          {/* Tool sub-pages */}
          <Route path="/tools/pixel-art" element={<PixelArtEditor />} />
          <Route path="/tools/fifa-stat" element={<FIFAStatGenerator />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
