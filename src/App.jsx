import './App.css'
import { HashRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import Archives from './pages/Archives'

export default function App() {

  return (
    <HashRouter>
      <div className="px-4 max-w-md mx-auto">
        <h1 className="my-8 text-xl font-bold text-center">
          K-Crossword Puzzle
        </h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archives/:id" element={<Archives />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

