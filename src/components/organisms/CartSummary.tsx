import React, { useState } from 'react';
import { FiChevronRight, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import './CartSummary.css';

// Interfaz para las propiedades del componente
interface CartSummaryProps {
  onContinue: () => void;
}

// Interfaz para los items del carrito
interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

// Componente CartSummary: Resumen del carrito de compras
// Este componente muestra los productos en el carrito y el resumen de costos
const CartSummary: React.FC<CartSummaryProps> = ({ onContinue }) => {
  // Datos de ejemplo para el carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Gin Bombay Sapphire',
      variant: '750ml',
      price: 12500,
      quantity: 1,
      image: '/images/products/gin-bombay.jpg'
    },
    {
      id: 2,
      name: 'Gin Hendrick\'s',
      variant: '700ml',
      price: 18900,
      quantity: 2,
      image: '/images/products/gin-hendricks.jpg'
    },
    {
      id: 3,
      name: 'Set de Botánicos Premium',
      variant: '12 unidades',
      price: 5600,
      quantity: 1,
      image: '/images/products/botanicos.jpg'
    }
  ]);

  // Función para incrementar la cantidad de un producto
  const incrementQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para decrementar la cantidad de un producto
  const decrementQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Costos de envío (ejemplo)
  const shipping = 1500;
  
  // Calcular total
  const total = subtotal + shipping;

  // Formatear precio en pesos argentinos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="cart-summary-container">
      <h2 className="section-title">Tu Carrito</h2>
      
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-variant">{item.variant}</p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      aria-label="Disminuir cantidad"
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => incrementQuantity(item.id)}
                      aria-label="Aumentar cantidad"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button 
                    className="remove-item-btn" 
                    onClick={() => removeItem(item.id)}
                    aria-label="Eliminar producto"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-costs-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          
          <div className="checkout-actions">
            <button className="btn-continue" onClick={onContinue}>
              Continuar con el envío <FiChevronRight />
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <FiShoppingBag />
          </div>
          <h3>Tu carrito está vacío</h3>
          <p>Parece que aún no has añadido productos a tu carrito.</p>
          <a href="/productos" className="btn-shop-now">Explorar productos</a>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
