import React from 'react';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { images } from '../../assets/images';
import './FeaturedProducts.css';

// Componente FeaturedProducts: Sección de productos destacados
// Este componente muestra una selección de productos destacados en la página principal
const FeaturedProducts: React.FC = () => {
  // Datos de ejemplo para los productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Gin Principe de los Apóstoles',
      price: 9200,
      oldPrice: 10500,
      discount: 12,
      image: images.products.apostoles,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 2,
      name: 'Hendrick\'s Gin 750 ml',
      price: 17500,
      oldPrice: null,
      discount: null,
      image: images.products.hendricks,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 3,
      name: 'Pack Gin Tonic Experience',
      price: 25000,
      oldPrice: 28000,
      discount: 10,
      image: images.products.pack,
      isNew: false,
      isBestSeller: false
    },
    {
      id: 4,
      name: 'Gin Mare 700 ml',
      price: 18500,
      oldPrice: null,
      discount: null,
      image: images.products.mare,
      isNew: false,
      isBestSeller: false
    }
  ];

  // Función para formatear el precio en formato de moneda argentina
  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString('es-AR')}`;
  };

  return (
    <section className="featured-products-section">
      <div className="featured-products-container">
        <div className="featured-products-header">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle">Nuestra selección de los mejores productos</p>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                
                {/* Badges */}
                <div className="product-badges">
                  {product.discount && (
                    <span className="badge discount-badge">-{product.discount}%</span>
                  )}
                  {product.isNew && (
                    <span className="badge new-badge">Nuevo</span>
                  )}
                  {product.isBestSeller && (
                    <span className="badge bestseller-badge">Top Ventas</span>
                  )}
                </div>
                
                {/* Acciones rápidas */}
                <div className="product-actions">
                  <button className="product-action-btn" aria-label="Agregar a favoritos">
                    <FiHeart />
                  </button>
                  <button className="product-action-btn" aria-label="Vista rápida">
                    <FiEye />
                  </button>
                  <button className="product-action-btn" aria-label="Agregar al carrito">
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">
                  {product.oldPrice && (
                    <span className="old-price">{formatPrice(product.oldPrice)}</span>
                  )}
                  <span className="current-price">{formatPrice(product.price)}</span>
                </div>
                <button className="add-to-cart-btn">Agregar al carrito</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-container">
          <a href="/productos" className="view-all-btn">Ver todos los productos →</a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
