import React from 'react'

export const Carretillero = () => {
  const [coccionAnticucho, setCoccionAnticucho] = React.useState('');
  const [tipoAnticucho, setTipoAnticucho] = React.useState('');
  const [mollejitas, setMollejitas] = React.useState('');
  const [complementos, setComplementos] = React.useState([]);
  const [adicionales, setAdicionales] = React.useState([]);
  const [comentario, setComentario] = React.useState('');
  
  // Cocción del anticucho
  const coccion = {
    cocido: 'Cocido',
    '3/4': '3/4',
    medio: 'Medio Cocido'
  }
  
  // Precios de cada opción
  const precios = {
    anticucho: {corazon: 12, brocheta_de_pollo: 10, mixto: 11},
    mollejitas: {tradicional: 8, bbq: 10},
    complemento: {papas: 10, ensalada: 4, arroz: 5},
    adicional: {queso: 1, huevo: 2, aji: 0.5}
  }
  
  // Manejar selección de complementos
  const handleComplementoChange = (e) => { //
    const value = e.target.value;
    if (e.target.checked) {
      setComplementos([...complementos, value]);
    } else {
      setComplementos(complementos.filter(item => item !== value));
    }
  };
  
  // Manejar selección de adicionales
  const handleAdicionalChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAdicionales([...adicionales, value]);
    } else {
      setAdicionales(adicionales.filter(item => item !== value));
    }
  };
  
  // Calcular el precio total
  const total = 
    (tipoAnticucho ? precios.anticucho[tipoAnticucho] : 0) +
    (mollejitas ? precios.mollejitas[mollejitas] : 0) +
    complementos.reduce((sum, item) => sum + precios.complemento[item], 0) +
    adicionales.reduce((sum, item) => sum + precios.adicional[item], 0);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/img/carretillero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        padding: '20px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '900px',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.85)',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          padding: '32px',
          color: '#fff'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontWeight: 'bold', color: '#FFD700', fontFamily: 'cursive', fontSize: '2.2rem' }}>
            Personaliza tu Carretillero
          </h2><p style={{ color: '#ccc', fontSize: '1.1rem' }}>
            Combina como quieras tus opciones favoritas
          </p>
          
        </div>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px'
          }}
        >
          {/* Columna izquierda */}
          <div>
            {/* Cocción del anticucho */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                Selecciona la cocción de tus anticuchos:
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
                {Object.entries(coccion).map(([key, value]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="coccion"
                      value={key}
                      checked={coccionAnticucho === key}
                      onChange={() => setCoccionAnticucho(key)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ color: '#fff' }}>
                      {value} <span style={{ fontSize: '0.9em', color: '#aaa' }}>({key})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Tipo de anticucho */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                Selecciona tu tipo de Anticucho:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                {Object.entries(precios.anticucho).map(([key, value]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="tipoAnticucho"
                      value={key}
                      checked={tipoAnticucho === key}
                      onChange={() => setTipoAnticucho(key)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ color: '#fff' }}>
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} 
                      <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Tipo de mollejitas */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                Selecciona tu tipo de mollejitas:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                {Object.entries(precios.mollejitas).map(([key, value]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="mollejitas"
                      value={key}
                      checked={mollejitas === key}
                      onChange={() => setMollejitas(key)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ color: '#fff' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} 
                      <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Columna derecha */}
          <div>
            {/* Complementos */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                Selecciona tus Complementos:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                {Object.entries(precios.complemento).map(([key, value]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="complementos"
                      value={key}
                      checked={complementos.includes(key)}
                      onChange={handleComplementoChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ color: '#fff' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} 
                      <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Adicionales */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                Selecciona tus Adicionales:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                {Object.entries(precios.adicional).map(([key, value]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="adicionales"
                      value={key}
                      checked={adicionales.includes(key)}
                      onChange={handleAdicionalChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ color: '#fff' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} 
                      <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Comentarios */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                Comentarios para tu pedido:
              </h3>
              <textarea
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                placeholder="¿Algún comentario especial para tu pedido?"
                rows={4}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  padding: '12px',
                  fontSize: '1em',
                  resize: 'vertical',
                  color: '#333',
                  background: '#fff'
                }}
              />
            </div>
            
            {/* Total y botón */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              background: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #FFB300'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.3em', color: '#FFD700' }}>
                Total: S/ {total.toFixed(2)}
              </div>
              
              <button
                style={{
                  padding: '12px 32px',
                  background: '#810000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1em',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#9a0000'}
                onMouseOut={(e) => e.target.style.background = '#810000'}
                onClick={() => {
                  alert('¡Pedido reservado con éxito!');
                  // Resetear selecciones
                  setCoccionAnticucho('');
                  setTipoAnticucho('');
                  setMollejitas('');
                  setComplementos([]);
                  setAdicionales([]);
                  setComentario('');
                }}
              >
                Reservar pedido
              </button>
            </div>
          </div>
        </div>
        
        {/* Resumen de selecciones */}
        <div style={{ marginTop: '30px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3 style={{ color: '#FFB300', marginBottom: '10px' }}>Tu selección:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {coccionAnticucho && (
              <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                <span style={{ color: '#FFD700' }}>Cocción:</span> {coccion[coccionAnticucho]}
              </div>
            )}
            
            {tipoAnticucho && (
              <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                <span style={{ color: '#FFD700' }}>Anticucho:</span> {tipoAnticucho.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
            )}
            
            {mollejitas && (
              <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                <span style={{ color: '#FFD700' }}>Mollejitas:</span> {mollejitas.charAt(0).toUpperCase() + mollejitas.slice(1)}
              </div>
            )}
            
            {complementos.length > 0 && (
              <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                <span style={{ color: '#FFD700' }}>Complementos:</span> {complementos.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
              </div>
            )}
            
            {adicionales.length > 0 && (
              <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                <span style={{ color: '#FFD700' }}>Adicionales:</span> {adicionales.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}