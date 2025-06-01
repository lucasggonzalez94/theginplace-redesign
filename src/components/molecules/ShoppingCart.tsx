import React, { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiX, FiMapPin, FiTruck, FiClock } from 'react-icons/fi';
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
  const [zipCode, setZipCode] = useState('');
  const [zipCodeSubmitted, setZipCodeSubmitted] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<{available: boolean; time?: string; cost?: number} | null>(null);
  const [isCheckingZipCode, setIsCheckingZipCode] = useState(false);
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

  // Función para verificar el código postal
  const checkZipCode = (e: FormEvent) => {
    e.preventDefault();
    setIsCheckingZipCode(true);
    
    // Simulamos una llamada a API para verificar el código postal
    setTimeout(() => {
      // Lógica de ejemplo para determinar si el envío está disponible
      // En un caso real, esto vendría de una API
      const zipCodeNumber = parseInt(zipCode);
      
      if (zipCode.length !== 4 || isNaN(zipCodeNumber)) {
        setDeliveryInfo(null);
        setZipCodeSubmitted(true);
        setIsCheckingZipCode(false);
        return;
      }
      
      // Códigos postales de ejemplo para diferentes zonas
      if (zipCodeNumber >= 1000 && zipCodeNumber <= 1499) {
        // CABA
        setDeliveryInfo({
          available: true,
          time: '24-48 horas',
          cost: 0 // Envío gratis
        });
      } else if (zipCodeNumber >= 1500 && zipCodeNumber <= 1900) {
        // GBA
        setDeliveryInfo({
          available: true,
          time: '2-3 días hábiles',
          cost: 1500
        });
      } else if (zipCodeNumber >= 2000 && zipCodeNumber <= 9999) {
        // Interior
        setDeliveryInfo({
          available: true,
          time: '3-5 días hábiles',
          cost: 2500
        });
      } else {
        // No disponible
        setDeliveryInfo({
          available: false
        });
      }
      
      setZipCodeSubmitted(true);
      setIsCheckingZipCode(false);
    }, 1000);
  };
  
  // Función para reiniciar la verificación de código postal
  const resetZipCode = () => {
    setZipCode('');
    setZipCodeSubmitted(false);
    setDeliveryInfo(null);
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
              {/* Sección de verificación de código postal */}
              <div className="shipping-check">
                <h5><FiTruck /> Verificar envío a tu zona</h5>
                
                {!zipCodeSubmitted ? (
                  <form onSubmit={checkZipCode} className="zipcode-form">
                    <div className="zipcode-input-group">
                      <FiMapPin />
                      <input 
                        type="text" 
                        placeholder="Código Postal" 
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        maxLength={4}
                        pattern="[0-9]{4}"
                        title="Ingresa un código postal válido de 4 dígitos"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="check-zipcode-btn"
                      disabled={isCheckingZipCode}
                    >
                      {isCheckingZipCode ? 'Verificando...' : 'Verificar'}
                    </button>
                  </form>
                ) : (
                  <div className="delivery-result">
                    {deliveryInfo ? (
                      deliveryInfo.available ? (
                        <div className="delivery-available">
                          <p className="delivery-status success">
                            <span className="icon-success">✓</span> Envío disponible al CP {zipCode}
                          </p>
                          <div className="delivery-details">
                            <p><FiClock /> Tiempo estimado: {deliveryInfo.time}</p>
                            <p>Costo de envío: {deliveryInfo.cost === 0 ? 'Gratis' : (deliveryInfo.cost ? formatPrice(deliveryInfo.cost) : '')}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="delivery-unavailable">
                          <p className="delivery-status error">
                            <span className="icon-error">✗</span> No realizamos envíos al CP {zipCode}
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="delivery-unavailable">
                        <p className="delivery-status error">
                          <span className="icon-error">✗</span> Código postal inválido
                        </p>
                      </div>
                    )}
                    <button 
                      className="reset-zipcode-btn" 
                      onClick={resetZipCode}
                    >
                      Verificar otro código postal
                    </button>
                  </div>
                )}
              </div>
              
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
