import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogIn, FiUserPlus, FiHeart, FiPackage, FiSettings, FiLogOut } from 'react-icons/fi';
import './UserProfile.css';

// Componente UserProfile: Menú desplegable de perfil de usuario
// Este componente muestra un icono de usuario que al hacer clic despliega un menú con opciones
const UserProfile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Estado simulado de autenticación (en una implementación real vendría de un contexto o estado global)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para alternar la apertura/cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para simular inicio de sesión (solo para demostración)
  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsMenuOpen(false);
  };

  // Función para simular cierre de sesión (solo para demostración)
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  // Efecto para cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-profile" ref={menuRef}>
      <button 
        className="profile-button" 
        onClick={toggleMenu}
        aria-label="Menú de usuario"
        aria-expanded={isMenuOpen}
      >
        <FiUser />
      </button>
      
      {isMenuOpen && (
        <div className="profile-menu">
          <div className="profile-menu-header">
            {isAuthenticated ? (
              <>
                <div className="user-avatar">
                  <span>JD</span>
                </div>
                <div className="user-info">
                  <h4>Juan Pérez</h4>
                  <p>juan@ejemplo.com</p>
                </div>
              </>
            ) : (
              <h4>Mi Cuenta</h4>
            )}
          </div>
          
          <div className="profile-menu-content">
            {isAuthenticated ? (
              <ul className="profile-menu-list">
                <li>
                  <a href="/mi-cuenta">
                    <FiUser className="menu-icon" />
                    <span>Mi Perfil</span>
                  </a>
                </li>
                <li>
                  <a href="/mis-favoritos">
                    <FiHeart className="menu-icon" />
                    <span>Mis Favoritos</span>
                  </a>
                </li>
                <li>
                  <a href="/mis-pedidos">
                    <FiPackage className="menu-icon" />
                    <span>Mis Pedidos</span>
                  </a>
                </li>
                <li>
                  <a href="/configuracion">
                    <FiSettings className="menu-icon" />
                    <span>Configuración</span>
                  </a>
                </li>
                <li className="menu-divider"></li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    <FiLogOut className="menu-icon" />
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>
            ) : (
              <div className="auth-buttons">
                <button onClick={handleLogin} className="login-button">
                  <FiLogIn className="button-icon" />
                  <span>Iniciar Sesión</span>
                </button>
                <a href="/registro" className="register-button">
                  <FiUserPlus className="button-icon" />
                  <span>Registrarse</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
