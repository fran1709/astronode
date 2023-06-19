import React, { useState, useEffect } from 'react';
import { API } from '../Api_Astronode';
import './Rover.css';

const Rover = () => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Función para obtener los datos y actualizar las imágenes
  async function obtenerDatos() {
    try {
      const response = await API.get('/astroApi/roverPics');
      setPictures(response.data.photos);
    } catch (error) {
      console.error(error);
    }
  }

  // Llamada inicial para obtener los datos
  useEffect(() => {
    obtenerDatos();
  }, []);

  // Función para manejar el evento click del botón "Siguiente"
  function handleNextClick() {
    if (currentPage < Math.ceil(pictures.length / 30)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Función para manejar el evento click del botón "Anterior"
  function handlePrevClick() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Obtener las imágenes correspondientes a la página actual
  const startIndex = (currentPage - 1) * 30;
  const endIndex = startIndex + 30;
  const currentPictures = pictures.slice(startIndex, endIndex);

  // Dividir las imágenes en columnas de 10
  const columns = [];
  for (let i = 0; i < currentPictures.length; i += 10) {
    const column = currentPictures.slice(i, i + 10);
    columns.push(column);
  }

  return (
    <div>
        <h1 className='mars-tittle'>Mars Rover Pictures</h1>
      <div className="mars-pagination-buttons">
        <button className='mars-button' onClick={handlePrevClick} disabled={currentPage === 1}>
          Anterior
        </button>
        <button className='mars-button' onClick={handleNextClick} disabled={currentPage === Math.ceil(pictures.length / 30)}>
          Siguiente
        </button>
      </div>
      <div className="mars-rover-container">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="mars-image-column">
            {column.map((picture) => (
              <div key={picture.id} className="mars-image-wrapper">
                <img className='mars-img' src={picture.img_src} alt={`Rover Picture ${picture.id}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rover;
