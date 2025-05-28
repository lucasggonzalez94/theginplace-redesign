import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft, FiCreditCard, FiDollarSign, FiLock } from 'react-icons/fi';
import './PaymentForm.css';

// Interfaz para las propiedades del componente
interface PaymentFormProps {
  paymentData: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    paymentMethod: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

// Componente PaymentForm: Formulario de pago
// Este componente permite al usuario seleccionar el método de pago e ingresar la información correspondiente
const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentData,
  onChange,
  onSubmit,
  onBack
}) => {
  // Estado para controlar la visualización de los diferentes métodos de pago
  const [showCardForm, setShowCardForm] = useState(paymentData.paymentMethod === 'credit_card');
  const [showTransferForm, setShowTransferForm] = useState(paymentData.paymentMethod === 'bank_transfer');
  
  // Función para formatear el número de tarjeta
  const formatCardNumber = (value: string) => {
    // Eliminar espacios y caracteres no numéricos
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Limitar a 16 dígitos
    const matches = v.substring(0, 16).match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    
    // Insertar espacio cada 4 dígitos
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length > 0 ? parts.join(' ') : value;
  };
  
  // Función para formatear la fecha de expiración
  const formatExpiryDate = (value: string) => {
    // Eliminar caracteres no numéricos y espacios
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Limitar a 4 dígitos
    const match = v.substring(0, 4);
    
    // Insertar barra después de los primeros 2 dígitos
    if (match.length > 2) {
      return `${match.substring(0, 2)}/${match.substring(2)}`;
    }
    
    return match;
  };
  
  // Manejar el cambio de método de pago
  const handlePaymentMethodChange = (method: string) => {
    // Actualizar el método de pago
    onChange({ target: { name: 'paymentMethod', value: method } } as React.ChangeEvent<HTMLInputElement>);
    
    // Mostrar/ocultar formularios según el método seleccionado
    setShowCardForm(method === 'credit_card');
    setShowTransferForm(method === 'bank_transfer');
  };
  
  // Manejar el cambio en el número de tarjeta
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    onChange({ target: { name: 'cardNumber', value: formattedValue } } as React.ChangeEvent<HTMLInputElement>);
  };
  
  // Manejar el cambio en la fecha de expiración
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    onChange({ target: { name: 'expiryDate', value: formattedValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="payment-form-container">
      <h2 className="section-title">Información de Pago</h2>
      
      <div className="secure-payment-notice">
        <FiLock />
        <span>Pago 100% seguro. Tu información está protegida con encriptación SSL.</span>
      </div>
      
      <form className="payment-form" onSubmit={onSubmit}>
        {/* Sección de métodos de pago */}
        <div className="form-section">
          <h3 className="form-section-title">Método de Pago</h3>
          
          <div 
            className={`option-card ${paymentData.paymentMethod === 'credit_card' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('credit_card')}
          >
            <input
              type="radio"
              id="paymentCreditCard"
              name="paymentMethod"
              className="option-radio"
              value="credit_card"
              checked={paymentData.paymentMethod === 'credit_card'}
              onChange={() => handlePaymentMethodChange('credit_card')}
            />
            <div className="option-icon">
              <FiCreditCard />
            </div>
            <div className="option-content">
              <div className="option-title">Tarjeta de Crédito/Débito</div>
              <div className="option-description">Visa, Mastercard, American Express</div>
            </div>
            <div className="payment-logos">
              <img src="/images/payment/visa.svg" alt="Visa" className="payment-logo" />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" className="payment-logo" />
              <img src="/images/payment/amex.svg" alt="American Express" className="payment-logo" />
            </div>
          </div>
          
          <div 
            className={`option-card ${paymentData.paymentMethod === 'bank_transfer' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('bank_transfer')}
          >
            <input
              type="radio"
              id="paymentBankTransfer"
              name="paymentMethod"
              className="option-radio"
              value="bank_transfer"
              checked={paymentData.paymentMethod === 'bank_transfer'}
              onChange={() => handlePaymentMethodChange('bank_transfer')}
            />
            <div className="option-icon">
              <FiDollarSign />
            </div>
            <div className="option-content">
              <div className="option-title">Transferencia Bancaria</div>
              <div className="option-description">Pago por transferencia a nuestra cuenta</div>
            </div>
          </div>
        </div>
        
        {/* Formulario de tarjeta de crédito */}
        {showCardForm && (
          <div className="form-section">
            <h3 className="form-section-title">Detalles de la Tarjeta</h3>
            
            <div className="credit-card-preview">
              <div className="card-front">
                <div className="card-type">
                  {paymentData.cardNumber.startsWith('4') && <span className="card-brand visa">VISA</span>}
                  {paymentData.cardNumber.startsWith('5') && <span className="card-brand mastercard">MASTERCARD</span>}
                  {paymentData.cardNumber.startsWith('3') && <span className="card-brand amex">AMEX</span>}
                  {!paymentData.cardNumber.match(/^[345]/) && <span className="card-brand">TARJETA</span>}
                </div>
                <div className="card-number">
                  {paymentData.cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="card-details">
                  <div className="card-holder">
                    <div className="card-label">TITULAR</div>
                    <div className="card-name">{paymentData.cardName || 'TU NOMBRE'}</div>
                  </div>
                  <div className="card-expiry">
                    <div className="card-label">VENCE</div>
                    <div className="card-date">{paymentData.expiryDate || 'MM/AA'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">Número de Tarjeta</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="form-input"
                value={paymentData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required={showCardForm}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName" className="form-label">Nombre en la Tarjeta</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                className="form-input"
                value={paymentData.cardName}
                onChange={onChange}
                placeholder="Como aparece en la tarjeta"
                required={showCardForm}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate" className="form-label">Fecha de Vencimiento</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="form-input"
                  value={paymentData.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/AA"
                  maxLength={5}
                  required={showCardForm}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv" className="form-label">Código de Seguridad (CVV)</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="form-input"
                  value={paymentData.cvv}
                  onChange={onChange}
                  placeholder="123"
                  maxLength={4}
                  required={showCardForm}
                />
                <div className="cvv-info">3 o 4 dígitos en el reverso de la tarjeta</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Información de transferencia bancaria */}
        {showTransferForm && (
          <div className="form-section">
            <h3 className="form-section-title">Detalles de la Transferencia</h3>
            
            <div className="bank-transfer-info">
              <p>Para completar tu compra mediante transferencia bancaria, sigue estos pasos:</p>
              
              <ol className="transfer-steps">
                <li>Realiza la transferencia a la siguiente cuenta:</li>
                <li className="bank-details">
                  <div><strong>Banco:</strong> Banco Nación Argentina</div>
                  <div><strong>Titular:</strong> The Gin Place S.A.</div>
                  <div><strong>CUIT:</strong> 30-71234567-8</div>
                  <div><strong>CBU:</strong> 0110012345678901234567</div>
                  <div><strong>Alias:</strong> THEGINPLACE.VENTAS</div>
                </li>
                <li>Una vez realizada la transferencia, envía el comprobante a <strong>pagos@theginplace.com.ar</strong> indicando tu número de pedido.</li>
                <li>Tu pedido será procesado una vez que confirmemos el pago (usualmente dentro de las 24 horas hábiles).</li>
              </ol>
              
              <div className="transfer-note">
                <strong>Nota:</strong> El total a transferir es el monto exacto de tu compra. Cualquier diferencia podría retrasar la confirmación de tu pago.
              </div>
            </div>
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="checkout-actions">
          <button type="button" className="btn-back" onClick={onBack}>
            <FiChevronLeft /> Volver al envío
          </button>
          <button type="submit" className="btn-continue">
            Finalizar compra <FiChevronRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
