import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import './Newsletter.css';

// Componente Newsletter: Sección de suscripción al boletín
// Este componente permite a los usuarios suscribirse al boletín de noticias
const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Función para manejar el cambio en el campo de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una implementación real, aquí se enviaría el email a un servicio de backend
    // Por ahora, solo simulamos una respuesta exitosa
    setIsSubmitted(true);
    setEmail('');
    
    // Resetear el estado después de 5 segundos
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Únete a nuestra comunidad</h2>
          <p className="newsletter-description">
            Suscríbete para recibir noticias, promociones exclusivas y consejos sobre el mundo del gin.
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit" className="newsletter-button" aria-label="Suscribirse">
                <span className="button-text">Suscribirse</span>
                <FiSend className="button-icon" />
              </button>
            </div>
            
            {isSubmitted && (
              <div className="success-message">
                ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
              </div>
            )}
            
            <p className="privacy-note">
              Al suscribirte, aceptas nuestra <a href="/politica-privacidad">política de privacidad</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
