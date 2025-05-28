import React, { useState } from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import { images } from '../assets/images';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiHeart, FiShoppingCart } from 'react-icons/fi';
import './ProductsPage.css';

// Datos de ejemplo para los productos
const productData = [
  {
    id: 1,
    name: 'Gin Principe de los Apóstoles',
    price: 9200,
    oldPrice: 10500,
    discount: 12,
    image: images.products.apostoles,
    category: 'nacional',
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
    category: 'importado',
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
    category: 'packs',
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
    category: 'importado',
    isNew: false,
    isBestSeller: false
  },
  {
    id: 5,
    name: 'Gin Bombay Sapphire 750 ml',
    price: 15800,
    oldPrice: 17200,
    discount: 8,
    image: images.products.hendricks, // Usando imagen de ejemplo
    category: 'importado',
    isNew: false,
    isBestSeller: true
  },
  {
    id: 6,
    name: 'Gin Beefeater London Dry 1L',
    price: 14500,
    oldPrice: null,
    discount: null,
    image: images.products.mare, // Usando imagen de ejemplo
    category: 'importado',
    isNew: false,
    isBestSeller: false
  },
  {
    id: 7,
    name: 'Gin Aconcagua 750 ml',
    price: 8900,
    oldPrice: 9800,
    discount: 9,
    image: images.products.apostoles, // Usando imagen de ejemplo
    category: 'nacional',
    isNew: true,
    isBestSeller: false
  },
  {
    id: 8,
    name: 'Pack Botánicos Premium',
    price: 7500,
    oldPrice: null,
    discount: null,
    image: images.products.pack, // Usando imagen de ejemplo
    category: 'botanicos',
    isNew: true,
    isBestSeller: false
  }
];

// Datos de ejemplo para las categorías
const categories = [
  { id: 'todos', name: 'Todos los productos' },
  { id: 'nacional', name: 'Gin Nacional' },
  { id: 'importado', name: 'Gin Importado' },
  { id: 'packs', name: 'Packs y Kits' },
  { id: 'botanicos', name: 'Botánicos' },
  { id: 'accesorios', name: 'Accesorios' }
];

// Componente ProductsPage: Página de productos
const ProductsPage: React.FC = () => {
  // Estados para los filtros y la vista
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);

  // Función para formatear el precio en formato de moneda argentina
  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString('es-AR')}`;
  };

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'todos'
    ? productData
    : productData.filter(product => product.category === selectedCategory);

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // relevance
        return 0;
    }
  });

  // Función para cambiar la categoría seleccionada
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Función para cambiar el modo de vista
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  // Función para cambiar el orden
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="products-page">
      <Navbar />
      
      <main className="products-main">
        {/* Encabezado de la página */}
        <div className="products-header">
          <div className="container">
            <h1 className="products-title">Nuestros Productos</h1>
            <div className="breadcrumbs">
              <a href="/">Inicio</a> <span>/</span> <span>Productos</span>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="products-content">
            {/* Barra lateral de filtros */}
            <aside className="products-sidebar">
              <div className="filter-section">
                <h3 className="filter-title">Categorías</h3>
                <ul className="category-list">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="filter-section">
                <h3 className="filter-title">Precio</h3>
                <div className="price-range">
                  <div className="price-slider">
                    <input
                      type="range"
                      min="0"
                      max="30000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="price-slider-input"
                    />
                  </div>
                  <div className="price-range-values">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              <div className="filter-section">
                <h3 className="filter-title">Filtros</h3>
                <div className="filter-options">
                  <label className="filter-checkbox">
                    <input type="checkbox" /> En oferta
                  </label>
                  <label className="filter-checkbox">
                    <input type="checkbox" /> Nuevos productos
                  </label>
                  <label className="filter-checkbox">
                    <input type="checkbox" /> Más vendidos
                  </label>
                </div>
              </div>
              
              <button className="apply-filters-btn">
                <FiFilter /> Aplicar Filtros
              </button>
            </aside>
            
            {/* Contenido principal de productos */}
            <div className="products-main-content">
              {/* Barra de herramientas */}
              <div className="products-toolbar">
                <div className="view-options">
                  <button
                    className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('grid')}
                    aria-label="Ver en cuadrícula"
                  >
                    <FiGrid />
                  </button>
                  <button
                    className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('list')}
                    aria-label="Ver en lista"
                  >
                    <FiList />
                  </button>
                </div>
                
                <div className="sort-options">
                  <label htmlFor="sort-select">Ordenar por:</label>
                  <div className="select-wrapper">
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="relevance">Relevancia</option>
                      <option value="price-low">Precio: Menor a Mayor</option>
                      <option value="price-high">Precio: Mayor a Menor</option>
                      <option value="name">Nombre</option>
                    </select>
                    <FiChevronDown className="select-icon" />
                  </div>
                </div>
              </div>
              
              {/* Lista de productos */}
              <div className={`products-list ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map(product => (
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
                          <button className="product-action-btn" aria-label="Agregar al carrito">
                            <FiShoppingCart />
                          </button>
                        </div>
                      </div>
                      
                      <div className="product-content">
                        <h3 className="product-title">{product.name}</h3>
                        <div className="product-category">{categories.find(c => c.id === product.category)?.name}</div>
                        <div className="product-price">
                          {product.oldPrice && (
                            <span className="old-price">{formatPrice(product.oldPrice)}</span>
                          )}
                          <span className="current-price">{formatPrice(product.price)}</span>
                        </div>
                        <button className="add-to-cart-btn">Agregar al carrito</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">
                    <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
                  </div>
                )}
              </div>
              
              {/* Paginación */}
              <div className="pagination">
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <span className="pagination-ellipsis">...</span>
                <button className="pagination-btn">10</button>
                <button className="pagination-btn pagination-next">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
