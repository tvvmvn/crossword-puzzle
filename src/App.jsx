import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Post from './pages/Post'
import CreateForm from './pages/CreateForm'
import NotFound from './pages/NotFound'

export default function App() {

  return (
    <HashRouter>
      <div className="max-w-xl min-h-screen mx-auto bg-white ">
        <header className="pt-2"></header>

        <Routes>
          <Route index element={<Home />} />
          <Route path="p/:id" element={<Post />} />
          <Route path="create" element={<CreateForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      {/* Footer */}
      <footer className="p-8"></footer>
      </div>
    </HashRouter>
  )
}

