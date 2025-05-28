import React from 'react';
import { FiChevronRight, FiChevronLeft, FiTruck, FiPackage } from 'react-icons/fi';
import './ShippingForm.css';

// Interfaz para las propiedades del componente
interface ShippingFormProps {
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
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

// Componente ShippingForm: Formulario de información de envío
// Este componente permite al usuario ingresar su información de envío y seleccionar el método de envío
const ShippingForm: React.FC<ShippingFormProps> = ({ 
  shippingData, 
  onChange, 
  onSubmit, 
  onBack 
}) => {
  return (
    <div className="shipping-form-container">
      <h2 className="section-title">Información de Envío</h2>
      
      <form className="shipping-form" onSubmit={onSubmit}>
        {/* Sección de información personal */}
        <div className="form-section">
          <h3 className="form-section-title">Información Personal</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
                value={shippingData.firstName}
                onChange={onChange}
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
                value={shippingData.lastName}
                onChange={onChange}
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={shippingData.email}
                onChange={onChange}
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={shippingData.phone}
                onChange={onChange}
                placeholder="Tu número de teléfono"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Sección de dirección de envío */}
        <div className="form-section">
          <h3 className="form-section-title">Dirección de Envío</h3>
          
          <div className="form-group">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              value={shippingData.address}
              onChange={onChange}
              placeholder="Calle y número"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="apartment" className="form-label">Departamento/Piso (opcional)</label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              className="form-input"
              value={shippingData.apartment}
              onChange={onChange}
              placeholder="Apartamento, suite, unidad, etc."
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" className="form-label">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input"
                value={shippingData.city}
                onChange={onChange}
                placeholder="Tu ciudad"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="province" className="form-label">Provincia</label>
              <select
                id="province"
                name="province"
                className="form-select"
                value={shippingData.province}
                onChange={onChange}
                required
              >
                <option value="">Seleccionar provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                <option value="Catamarca">Catamarca</option>
                <option value="Chaco">Chaco</option>
                <option value="Chubut">Chubut</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Formosa">Formosa</option>
                <option value="Jujuy">Jujuy</option>
                <option value="La Pampa">La Pampa</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Misiones">Misiones</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Salta">Salta</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="Tucumán">Tucumán</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="postalCode" className="form-label">Código Postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className="form-input"
              value={shippingData.postalCode}
              onChange={onChange}
              placeholder="Tu código postal"
              required
            />
          </div>
        </div>
        
        {/* Sección de métodos de envío */}
        <div className="form-section">
          <h3 className="form-section-title">Método de Envío</h3>
          
          <div 
            className={`option-card ${shippingData.shippingMethod === 'standard' ? 'selected' : ''}`}
            onClick={() => onChange({ target: { name: 'shippingMethod', value: 'standard' } } as React.ChangeEvent<HTMLInputElement>)}
          >
            <input
              type="radio"
              id="shippingStandard"
              name="shippingMethod"
              className="option-radio"
              value="standard"
              checked={shippingData.shippingMethod === 'standard'}
              onChange={onChange}
            />
            <div className="option-icon">
              <FiTruck />
            </div>
            <div className="option-content">
              <div className="option-title">Envío Estándar</div>
              <div className="option-description">Entrega en 3-5 días hábiles</div>
            </div>
            <div className="option-price">$1.500</div>
          </div>
          
          <div 
            className={`option-card ${shippingData.shippingMethod === 'express' ? 'selected' : ''}`}
            onClick={() => onChange({ target: { name: 'shippingMethod', value: 'express' } } as React.ChangeEvent<HTMLInputElement>)}
          >
            <input
              type="radio"
              id="shippingExpress"
              name="shippingMethod"
              className="option-radio"
              value="express"
              checked={shippingData.shippingMethod === 'express'}
              onChange={onChange}
            />
            <div className="option-icon">
              <FiPackage />
            </div>
            <div className="option-content">
              <div className="option-title">Envío Express</div>
              <div className="option-description">Entrega en 24-48 horas</div>
            </div>
            <div className="option-price">$2.800</div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="checkout-actions">
          <button type="button" className="btn-back" onClick={onBack}>
            <FiChevronLeft /> Volver al carrito
          </button>
          <button type="submit" className="btn-continue">
            Continuar al pago <FiChevronRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
