import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

// Componente SearchBar: Barra de búsqueda visible permanentemente
// Este componente muestra un campo de búsqueda siempre visible en la barra de navegación
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Función para manejar el envío del formulario de búsqueda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la búsqueda
    console.log('Búsqueda realizada:', searchQuery);
    // Opcional: limpiar el campo después de buscar
    // setSearchQuery('');
  };

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button 
          type="submit" 
          className="search-submit"
          aria-label="Buscar"
        >
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
