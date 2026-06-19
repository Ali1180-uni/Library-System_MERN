import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Signup from './Components/Signup'
import About from './Components/About'
import Books from './Components/Books'
import logo from '/Title Icon.png'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar logo={logo} Auth={false} User="John Doe" />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
