import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Puzzle from './pages/Puzzle'

export default function App() {

  return (
    <HashRouter>
      <div className="max-w-xl min-h-screen mx-auto px-4 bg-white ">
        <header className="pt-2"></header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="archives/:id" element={<Puzzle />} />
        </Routes>

      {/* Footer */}
      <footer className="p-12"></footer>
      </div>
    </HashRouter>
  )
}

