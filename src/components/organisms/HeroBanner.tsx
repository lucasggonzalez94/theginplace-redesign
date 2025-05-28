import React from 'react';
import { images } from '../../assets/images';
import './HeroBanner.css';

// Componente HeroBanner: Banner principal de la página de inicio
// Este componente muestra un banner a pantalla completa con imagen de fondo, título y botones de acción
const HeroBanner: React.FC = () => {
  // Estilo para la imagen de fondo
  const heroStyle = {
    backgroundImage: `url(${images.heroBanner})`
  };

  return (
    <section className="hero-banner" style={heroStyle}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">BIENVENIDOS A THE GIN PLACE</p>
          <h1 className="hero-title">El paraíso del Gin en Argentina</h1>
          <p className="hero-description">
            Descubre el origen completo de todas nuestras marcas e importaciones. Sumérgete, 
            aprende y enamórate para crear el Gin Tonic perfecto.
          </p>
          <div className="hero-buttons">
            <a href="/productos" className="btn btn-primary">Explorar Productos</a>
            <a href="/nosotros" className="btn btn-secondary">Sobre Nosotros</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
