import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiX } from 'react-icons/fi';
import { images } from '../../assets/images';
import './ShoppingCart.css';

// Datos de ejemplo para los productos en el carrito
const cartItems = [
  {
    id: 1,
    name: 'Gin Principe de los Apóstoles',
    price: 9200,
    quantity: 1,
    image: images.products.apostoles
  },
  {
    id: 2,
    name: 'Hendrick\'s Gin 750 ml',
    price: 17500,
    quantity: 1,
    image: images.products.hendricks
  },
  {
    id: 3,
    name: 'Pack Gin Tonic Experience',
    price: 25000,
    quantity: 1,
    image: images.products.pack
  }
];

// Componente ShoppingCart: Carrito de compras desplegable
// Este componente muestra un icono de carrito con contador y un panel desplegable con los productos
const ShoppingCart: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  
  // Función para alternar la apertura/cierre del carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Efecto para cerrar el carrito al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para formatear el precio en formato de moneda argentina
  const formatPrice = (price: number) => {
    return `$ ${price.toLocaleString('es-AR')}`;
  };

  // Calcular el total del carrito
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Número total de items en el carrito
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="shopping-cart" ref={cartRef}>
      <button 
        className="cart-button" 
        onClick={toggleCart}
        aria-label="Carrito de compras"
        aria-expanded={isCartOpen}
      >
        <FiShoppingCart />
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </button>
      
      {isCartOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h4>Mi Carrito ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})</h4>
            <button 
              className="close-cart"
              onClick={toggleCart}
              aria-label="Cerrar carrito"
            >
              <FiX />
            </button>
          </div>
          
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h5 className="item-name">{item.name}</h5>
                    <div className="item-price">{formatPrice(item.price)}</div>
                    <div className="item-quantity">
                      <button className="quantity-btn">-</button>
                      <span>{item.quantity}</span>
                      <button className="quantity-btn">+</button>
                    </div>
                  </div>
                  <button className="remove-item" aria-label="Eliminar producto">
                    <FiTrash2 />
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-cart">
                <p>Tu carrito está vacío</p>
                <Link to="/productos" className="continue-shopping">Continuar comprando</Link>
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-price">{formatPrice(cartTotal)}</span>
              </div>
              <div className="cart-actions">
                <Link to="/checkout" className="view-cart-btn">Ver Carrito</Link>
                <Link to="/checkout" className="checkout-btn">Finalizar Compra</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
