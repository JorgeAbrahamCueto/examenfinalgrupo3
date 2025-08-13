import React from 'react'
import { Link } from 'react-router-dom';

export const Inicio = () => {
  const images = [
    {
      src: 'img/Combinalo_como_quieras.jpg',
      //alt: 'Combínalo como quieras',
      link: '/combinalo'
    },
    {
      src: 'img/Carretillero.jpg',
      //alt: 'Imagen 2',
      link: '/Carretillero'
    },
    
  ];

  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Botón de Login */}
      <Link 
        to="/login" 
       style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          padding: '10px 20px',
          background: 'rgba(255, 255, 255, 0.7)',
          color: '#333',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          border: '2px solid #fff'
        }}
      >
        Solo Personal
      </Link>
      {images.map((img, idx) => (
        <Link
          key={idx}
          to={img.link}
          style={{
            display: idx === current ? 'flex' : 'none',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: '#fff',
            background: 'rgba(0,0,0,0.4)',
            padding: '10px 20px',
            borderRadius: '8px'
          }}>
            {img.alt}
          </div>
        </Link>
      ))}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        display: 'flex',
        gap: '8px'
      }}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: 'none',
              background: idx === current ? '#fff' : '#888',
              opacity: 0.7,
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}
