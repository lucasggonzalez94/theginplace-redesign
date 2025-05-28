import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { images } from '../../assets/images';
import './Footer.css';

// Componente Footer: Pie de página del sitio
// Este componente muestra el pie de página con información de contacto, enlaces y redes sociales
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <div className="footer-logo">
              <h3>The Gin Place</h3>
            </div>
            <p className="footer-description">
              Somos importadores y distribuidores de las mejores marcas de Gin del mundo. 
              Nuestra pasión es compartir la cultura del Gin Tonic en Argentina.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>Av. Corrientes 1234, CABA</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+54 11 5678-9012</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>info@theginplace.com.ar</span>
              </div>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Categorías</h4>
            <ul className="footer-links">
              <li><Link to="/productos?categoria=gin-nacional">Gin Nacional</Link></li>
              <li><Link to="/productos?categoria=gin-importado">Gin Importado</Link></li>
              <li><Link to="/productos?categoria=accesorios">Accesorios</Link></li>
              <li><Link to="/productos?categoria=botanicos">Botánicos</Link></li>
              <li><Link to="/productos?categoria=packs-regalo">Packs Regalo</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-title">Información</h4>
            <ul className="footer-links">
              <li><Link to="/envios">Envíos y entregas</Link></li>
              <li><Link to="/devoluciones">Política de devoluciones</Link></li>
              <li><Link to="/privacidad">Política de privacidad</Link></li>
              <li><Link to="/terminos">Términos y condiciones</Link></li>
              <li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-middle">
          <div className="newsletter-mini">
            <h4 className="newsletter-mini-title">Suscríbete a nuestro newsletter</h4>
            <form className="newsletter-mini-form">
              <input type="email" placeholder="Tu correo electrónico" required />
              <button type="submit">ENVIAR</button>
            </form>
          </div>
          
          <div className="social-links">
            <a href="https://facebook.com" className="social-link" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="https://instagram.com" className="social-link" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
              <FiTwitter />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="payment-methods">
            <img src={images.payment.visa} alt="Visa" />
            <img src={images.payment.mastercard} alt="Mastercard" />
            <img src={images.payment.amex} alt="American Express" />
            <img src={images.payment.mercadopago} alt="MercadoPago" />
          </div>
          
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} The Gin Place. Todos los derechos reservados.</p>
            <p className="disclaimer">Beber con moderación. Prohibida su venta a menores de 18 años.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
