import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Puzzle from './pages/Puzzle'
import CreateForm from './pages/CreateForm'

export default function App() {

  return (
    <BrowserRouter>
      <div className="max-w-xl min-h-screen mx-auto px-4 bg-white ">
        <header className="pt-2"></header>

        <Routes>
          <Route path="crossword-puzzle">
            <Route index element={<Home />} />
            <Route path="puzzles/:id" element={<Puzzle />} />
            <Route path="create" element={<CreateForm />} />
          </Route>
        </Routes>

      {/* Footer */}
      <footer className="p-8"></footer>
      </div>
    </BrowserRouter>
  )
}

