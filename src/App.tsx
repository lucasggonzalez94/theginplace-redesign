import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FiArrowUp } from 'react-icons/fi'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Función para mostrar/ocultar el botón de volver arriba según el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Función para volver al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      
      {/* Botón para volver arriba */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <FiArrowUp />
      </button>
    </Router>
  )
}

export default App
