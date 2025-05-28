import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiUser, FiMapPin, FiTruck, FiCreditCard } from 'react-icons/fi';
import './OrderConfirmation.css';

// Interfaz para las propiedades del componente
interface OrderConfirmationProps {
  shippingData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    province: string;
    postalCode: string;
    shippingMethod: string;
  };
  paymentData: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    paymentMethod: string;
  };
}

// Componente OrderConfirmation: Confirmación de pedido
// Este componente muestra la confirmación del pedido y los detalles del mismo
const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  shippingData,
  paymentData
}) => {
  // Generar un número de pedido aleatorio
  const orderNumber = `GIN-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  // Obtener la fecha actual
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  // Calcular la fecha estimada de entrega (3-5 días para estándar, 1-2 días para express)
  const deliveryDays = shippingData.shippingMethod === 'express' ? 2 : 5;
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  // Formatear el número de tarjeta para mostrar solo los últimos 4 dígitos
  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const lastDigits = cardNumber.replace(/\s/g, '').slice(-4);
    return `**** **** **** ${lastDigits}`;
  };
  
  // Obtener el nombre del método de envío
  const getShippingMethodName = (method: string) => {
    switch (method) {
      case 'standard':
        return 'Envío Estándar (3-5 días hábiles)';
      case 'express':
        return 'Envío Express (24-48 horas)';
      default:
        return 'Envío Estándar';
    }
  };
  
  // Obtener el nombre del método de pago
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Tarjeta de Crédito/Débito';
      case 'bank_transfer':
        return 'Transferencia Bancaria';
      default:
        return 'Tarjeta de Crédito/Débito';
    }
  };

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-header">
        <div className="confirmation-icon">
          <FiCheckCircle />
        </div>
        <h2 className="confirmation-title">¡Pedido Confirmado!</h2>
        <p className="confirmation-message">
          Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
          Te enviaremos un correo electrónico con los detalles y actualizaciones de tu pedido.
        </p>
      </div>
      
      <div className="order-summary">
        <div className="order-number">
          <strong>Número de Pedido:</strong> {orderNumber}
        </div>
        <div className="order-date">
          <strong>Fecha:</strong> {formattedDate}
        </div>
        <div className="order-delivery">
          <strong>Entrega Estimada:</strong> {formattedDeliveryDate}
        </div>
      </div>
      
      <div className="order-details">
        <div className="detail-section">
          <div className="detail-icon">
            <FiUser />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Información Personal</h3>
            <div className="detail-info">
              <p><strong>Nombre:</strong> {shippingData.firstName} {shippingData.lastName}</p>
              <p><strong>Email:</strong> {shippingData.email}</p>
              <p><strong>Teléfono:</strong> {shippingData.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-icon">
            <FiMapPin />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Dirección de Envío</h3>
            <div className="detail-info">
              <p>{shippingData.address}</p>
              {shippingData.apartment && <p>{shippingData.apartment}</p>}
              <p>{shippingData.city}, {shippingData.province}</p>
              <p>CP: {shippingData.postalCode}</p>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-icon">
            <FiTruck />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Método de Envío</h3>
            <div className="detail-info">
              <p>{getShippingMethodName(shippingData.shippingMethod)}</p>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <div className="detail-icon">
            <FiCreditCard />
          </div>
          <div className="detail-content">
            <h3 className="detail-title">Método de Pago</h3>
            <div className="detail-info">
              <p>{getPaymentMethodName(paymentData.paymentMethod)}</p>
              {paymentData.paymentMethod === 'credit_card' && (
                <p>{formatCardNumber(paymentData.cardNumber)}</p>
              )}
              {paymentData.paymentMethod === 'bank_transfer' && (
                <p className="transfer-instructions">
                  Por favor, realiza la transferencia a la cuenta indicada y envía el comprobante a 
                  <strong> pagos@theginplace.com.ar</strong> mencionando tu número de pedido.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="order-total">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>$37.000</span>
        </div>
        <div className="total-row">
          <span>Envío:</span>
          <span>{shippingData.shippingMethod === 'express' ? '$2.800' : '$1.500'}</span>
        </div>
        <div className="total-row grand-total">
          <span>Total:</span>
          <span>{shippingData.shippingMethod === 'express' ? '$39.800' : '$38.500'}</span>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <Link to="/productos" className="btn-shop-more">
          <FiShoppingBag /> Seguir Comprando
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
