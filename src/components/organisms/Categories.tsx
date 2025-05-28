import React from 'react';
import { images } from '../../assets/images';
import './Categories.css';

// Componente Categories: Sección de categorías de productos
// Este componente muestra las diferentes categorías de productos disponibles
const Categories: React.FC = () => {
  // Datos de ejemplo para las categorías
  const categories = [
    {
      id: 1,
      name: 'Gin Nacional',
      description: 'Descubre lo mejor de nuestra tierra',
      image: images.categories.national,
      link: '/categoria/gin-nacional'
    },
    {
      id: 2,
      name: 'Gin Importado',
      description: 'Sabores de todo el mundo',
      image: images.categories.imported,
      link: '/categoria/gin-importado'
    },
    {
      id: 3,
      name: 'Accesorios',
      description: 'Complementa tu experiencia',
      image: images.categories.accessories,
      link: '/categoria/accesorios'
    },
    {
      id: 4,
      name: 'Botanicos',
      description: 'Potencia tus creaciones',
      image: images.categories.botanicals,
      link: '/categoria/botanicos'
    }
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="section-title">Nuestras Categorías</h2>
          <p className="section-subtitle">Explora nuestra selección de productos para encontrar lo que necesitas</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div className="category-card" key={category.id}>
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-content">
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <a href={category.link} className="category-link">Ver más →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
