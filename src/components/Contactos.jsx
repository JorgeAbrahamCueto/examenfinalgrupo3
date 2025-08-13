import React from 'react'

export const Contactos = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h2 style={{
        color: "#fff",
        textShadow: "0 2px 12px #00c6ff, 0 0 2px #fff",
        marginBottom: "2rem",
        fontSize: "2.5rem",
        letterSpacing: "2px"
      }}>
        Contáctanos
      </h2>
      <div style={{
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        padding: '2.5rem 2rem',
        borderRadius: '28px',
        boxShadow: '0 6px 32px rgba(0,0,0,0.18)',
        maxWidth: '420px',
        width: '100%',
        color: '#fff',
        fontSize: '1.1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div>
          <strong>Correo electrónico:</strong>
          <div>contacto@polleria3sabores.com</div>
          <div>reservas@polleria3sabores.com</div>
        </div>
        <div>
          <strong>Teléfonos:</strong>
          <div>(01) 234-5678</div>
          <div>+51 987 654 321</div>
        </div>
        <div>
          <strong>Dirección de oficinas:</strong>
          <div>Av. Los Sabores 1234, Surco, Lima, Perú</div>
        </div>
        <div>
          <strong>Horario de atención:</strong>
          <div>Lunes a Domingo: 10:00 am - 10:00 pm</div>
        </div>
      </div>
    </div>
  )
}
