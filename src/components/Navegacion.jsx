import React from 'react'
//import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export const Navegacion = ({ fondo = '#f9a58c', bannerImg }) => {
  const [menuAbierto, setMenuAbierto] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const handleNavLinkClick = () => setMenuAbierto(false);

  // Estilos para el efecto de llamas
  const flamesStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '90px',
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'hidden'
  };

  return (  
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: '#000',
          backgroundImage: 'none',
          minHeight: scrolled ? '80px' : '150px',
          transition: 'min-height 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          overflow: 'visible'
        }}
      >
 {/* Efecto de llamas más reales y puntiagudas */}
<div style={flamesStyle}>
  <svg width="100%" height="100%" viewBox="0 0 500 120" preserveAspectRatio="none" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="flameGradient" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#ff4500" />
        <stop offset="40%" stopColor="#ff6f00" />
        <stop offset="80%" stopColor="#ffcc00" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
      </linearGradient>
      <filter id="flameBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
    </defs>
    <g>
      <path
        d="
          M0,120 
          Q25,30 50,120 
          Q75,45 100,120 
          Q125,25 150,120 
          Q175,50 200,120 
          Q225,35 250,120 
          Q275,55 300,120 
          Q325,20 350,120 
          Q375,40 400,120 
          Q425,30 450,120 
          Q475,50 500,120 
          L500,120 L0,120 Z
        "
        fill="url(#flameGradient)"
        filter="url(#flameBlur)"
      >
        <animate 
          attributeName="d"
          dur="1.8s"
          repeatCount="indefinite"
          values="
            M0,120 Q25,30 50,120 Q75,45 100,120 Q125,25 150,120 Q175,50 200,120 Q225,35 250,120 Q275,55 300,120 Q325,20 350,120 Q375,40 400,120 Q425,30 450,120 Q475,50 500,120 L500,120 L0,120 Z;
            M0,120 Q25,40 50,120 Q75,30 100,120 Q125,40 150,120 Q175,20 200,120 Q225,50 250,120 Q275,25 300,120 Q325,45 350,120 Q375,30 400,120 Q425,50 450,120 Q475,35 500,120 L500,120 L0,120 Z;
            M0,120 Q25,30 50,120 Q75,45 100,120 Q125,25 150,120 Q175,50 200,120 Q225,35 250,120 Q275,55 300,120 Q325,20 350,120 Q375,40 400,120 Q425,30 450,120 Q475,50 500,120 L500,120 L0,120 Z
          "
        />
      </path>
    </g>
  </svg>
</div>
        <div className="container-fluid mx-3" style={{ position: 'relative', zIndex: 2 }}>
          <NavLink className="navbar-brand" to="/">
            <div className="d-flex flex-column align-items-center">
              <img 
                src="/img/logo.png" 
                alt="Logo" 
                style={{height: scrolled ? '60px' : '100px', transition: 'height 0.3s ease' }}
              />
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={menuAbierto}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
            style={{ color: '#fff', borderColor: '#fff' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end${menuAbierto ? ' show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/carta" onClick={handleNavLinkClick} style={{ color: '#fff' }}>Carta</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contactos" onClick={handleNavLinkClick} style={{ color: '#fff' }}>Contactanos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nosotros" onClick={handleNavLinkClick} style={{ color: '#fff' }}>Nosotros</NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink
                  to="/reservas"
                  onClick={handleNavLinkClick}
                  style={{
                    backgroundColor: '#B50000',
                    color: '#fff',
                    padding: '8px 20px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                >
                  Reserva Ya
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Espaciador para evitar que el contenido quede oculto detrás de la navbar fija */}
      <div style={{ minHeight: scrolled ? '80px' : '150px' }} />
    </div>
  );
}
