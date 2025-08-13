import React, { useRef } from 'react';

export const Nosotros = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(120deg, #ffecd2 0%, #fcb69f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      <div
        className="container"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(44,62,80,0.15)',
          padding: '48px 32px',
          maxWidth: '800px',
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{
            color: '#b71c1c',
            fontWeight: 700,
            textShadow: '0 2px 8px #fff, 0 0 2px #fff',
            letterSpacing: '2px',
          }}
        >
          Sobre Nosotros
        </h2>
        <div className="text-center mb-4">
          <img
            src="img/logo.png"
            alt="Logo Pollería 3 Sabores"
            style={{
              width: '120px',
              borderRadius: '50%',
              boxShadow: '0 4px 16px rgba(183,28,28,0.15)',
              marginBottom: '16px',
            }}
          />
        </div>
        <p style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.7 }}>
          <strong>Pollería 3 Sabores</strong> nació en el corazón de Lima en 2010, cuando tres amigos apasionados por la cocina peruana decidieron unir sus recetas familiares y crear un lugar donde cada plato contara una historia. Inspirados por la diversidad de sabores de nuestro país, fusionamos tradición, innovación y mucho cariño en cada preparación.
        </p>
        <p style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.7 }}>
          Nuestro nombre representa la esencia de nuestra propuesta: tres estilos únicos de pollo a la brasa, cada uno con su propio toque especial. Desde el clásico sabor limeño, pasando por la receta secreta de la abuela con hierbas andinas, hasta el atrevido pollo picante amazónico, en <strong>3 Sabores</strong> hay una experiencia para cada paladar.
        </p>
        <p style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.7 }}>
          Más que una pollería, somos una familia que celebra la buena mesa, la amistad y la alegría de compartir. Te invitamos a visitarnos y descubrir por qué nuestros clientes dicen que en cada bocado se siente el sabor de casa.
        </p>
        <div className="text-center mt-5">
          <img
            src="#"
            alt="Local Pollería 3 Sabores"
            style={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '16px',
              boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
