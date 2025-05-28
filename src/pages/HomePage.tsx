import React from 'react';
import Navbar from '../components/organisms/Navbar';
import HeroBanner from '../components/organisms/HeroBanner';
import Categories from '../components/organisms/Categories';
import FeaturedProducts from '../components/organisms/FeaturedProducts';
import Features from '../components/organisms/Features';
import Newsletter from '../components/organisms/Newsletter';
import Footer from '../components/organisms/Footer';
import './HomePage.css';

// Componente HomePage: Página principal del sitio
// Este componente integra todos los organismos para formar la página de inicio completa
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <HeroBanner />
        <Categories />
        <FeaturedProducts />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
