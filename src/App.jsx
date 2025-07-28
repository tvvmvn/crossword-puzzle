import './App.css'
import { HashRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import Archives from './pages/Archives'
import Puzzle from './pages/Puzzle'

export default function App() {

  return (
    <HashRouter>
      <div className="px-4 max-w-md mx-auto">        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="archives">
            <Route index element={<Archives />} />
            <Route path=":id" element={<Puzzle />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  )
}

