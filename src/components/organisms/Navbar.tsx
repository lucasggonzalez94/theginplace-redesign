import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../molecules/SearchBar';
import UserProfile from '../molecules/UserProfile';
import ShoppingCart from '../molecules/ShoppingCart';
import './Navbar.css';

// Componente Navbar: Barra de navegación principal
// Este componente implementa la barra de navegación superior con logo, menú y acciones
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Función para alternar el estado del menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">The Gin Place</Link>
        </div>

        {/* Menú de navegación principal */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/productos" className={location.pathname === '/productos' ? 'active' : ''} onClick={closeMenu}>Productos</Link></li>
            <li><Link to="/nosotros" className={location.pathname === '/nosotros' ? 'active' : ''} onClick={closeMenu}>Nosotros</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} onClick={closeMenu}>Blog</Link></li>
            <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''} onClick={closeMenu}>Contacto</Link></li>
          </ul>
        </div>

        {/* Acciones de usuario */}
        <div className="navbar-actions">
          <SearchBar />
          <UserProfile />
          <ShoppingCart />
        </div>

        {/* Botón de menú móvil */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Menú">
          <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
