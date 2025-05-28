import React from 'react';
import { FiTruck, FiCreditCard, FiAward } from 'react-icons/fi';
import './Features.css';

// Componente Features: Sección de características/beneficios
// Este componente muestra los principales beneficios de comprar en la tienda
const Features: React.FC = () => {
  // Datos de ejemplo para las características
  const features = [
    {
      id: 1,
      icon: <FiTruck size={32} />,
      title: 'Envíos a todo el país',
      description: 'Recibimos tu pedido y te lo enviamos a cualquier parte de Argentina'
    },
    {
      id: 2,
      icon: <FiCreditCard size={32} />,
      title: 'Múltiples formas de pago',
      description: 'Tarjetas de crédito, transferencia bancaria y efectivo en puntos de pago'
    },
    {
      id: 3,
      icon: <FiAward size={32} />,
      title: 'Regalos corporativos',
      description: 'Ofrecemos opciones personalizadas para empresas y eventos especiales'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
