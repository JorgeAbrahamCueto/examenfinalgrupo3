import React from 'react';

export const Combinalo = () => {
    const [pollo, setPollo] = React.useState('');
    const [complemento, setComplemento] = React.useState('');
    const [ensalada, setEnsalada] = React.useState('');
    const [bebida, setBebida] = React.useState('');
    const [comentario, setComentario] = React.useState('');

    // Precios de cada opción
    const precios = {
        pollo: { brasa: 60, broster: 58 },
        complemento: { papas_fritas: 18, papas_doradas: 20 },
        ensalada: { fresca: 20, cocida: 22 },
        bebida: { inca_kola: 8.5, coca_cola: 8.5, chicha_morada: 10, maracuya: 10 }
    };

    // Etiquetas para mostrar
    const etiquetas = {
        pollo: { 
            brasa: 'Brasa', 
            broster: 'Broster' 
        },
        complemento: { 
            papas_fritas: 'Papas Fritas', 
            papas_doradas: 'Papas Doradas' 
        },
        ensalada: { 
            fresca: 'Fresca', 
            cocida: 'Cocida' 
        },
        bebida: { 
            inca_kola: 'Inca Kola', 
            coca_cola: 'Coca Cola', 
            chicha_morada: 'Chicha Morada', 
            maracuya: 'Maracuyá' 
        }
    };

    // Calcular total
    const total =
        (pollo ? precios.pollo[pollo] : 0) +
        (complemento ? precios.complemento[complemento] : 0) +
        (ensalada ? precios.ensalada[ensalada] : 0) +
        (bebida ? precios.bebida[bebida] : 0);

    const resetearSelecciones = () => {
        setPollo('');
        setComplemento('');
        setEnsalada('');
        setBebida('');
        setComentario('');
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: "url('/img/Combinalo_como_quieras.jpg')",
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
                        Combínalo como Quieras
                    </h2>
                    <p style={{ color: '#ccc', fontSize: '1.1rem' }}>
                        Crea tu propia combinación de pollo
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
                        {/* Selección de pollo */}
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                                Selecciona tu pollo:
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                                {Object.entries(precios.pollo).map(([key, value]) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="pollo"
                                            value={key}
                                            checked={pollo === key}
                                            onChange={() => setPollo(key)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <span style={{ color: '#fff' }}>
                                            {etiquetas.pollo[key]} 
                                            <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        {/* Selección de complemento */}
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                                Selecciona tu complemento:
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                                {Object.entries(precios.complemento).map(([key, value]) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="complemento"
                                            value={key}
                                            checked={complemento === key}
                                            onChange={() => setComplemento(key)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <span style={{ color: '#fff' }}>
                                            {etiquetas.complemento[key]} 
                                            <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Columna derecha */}
                    <div>
                        {/* Selección de ensalada */}
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                                Selecciona tu ensalada:
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                                {Object.entries(precios.ensalada).map(([key, value]) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="ensalada"
                                            value={key}
                                            checked={ensalada === key}
                                            onChange={() => setEnsalada(key)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <span style={{ color: '#fff' }}>
                                            {etiquetas.ensalada[key]} 
                                            <span style={{ marginLeft: '8px', color: '#FFD700' }}>(S/ {value})</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        {/* Selección de bebida */}
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: '#FFB300', borderBottom: '2px solid #FFB300', paddingBottom: '8px' }}>
                                Selecciona tu bebida:
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                                {Object.entries(precios.bebida).map(([key, value]) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="bebida"
                                            value={key}
                                            checked={bebida === key}
                                            onChange={() => setBebida(key)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <span style={{ color: '#fff' }}>
                                            {etiquetas.bebida[key]} 
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
                                    resetearSelecciones();
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
                        {pollo && (
                            <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                                <span style={{ color: '#FFD700' }}>Pollo:</span> {etiquetas.pollo[pollo]}
                            </div>
                        )}
                        
                        {complemento && (
                            <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                                <span style={{ color: '#FFD700' }}>Complemento:</span> {etiquetas.complemento[complemento]}
                            </div>
                        )}
                        
                        {ensalada && (
                            <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                                <span style={{ color: '#FFD700' }}>Ensalada:</span> {etiquetas.ensalada[ensalada]}
                            </div>
                        )}
                        
                        {bebida && (
                            <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                                <span style={{ color: '#FFD700' }}>Bebida:</span> {etiquetas.bebida[bebida]}
                            </div>
                        )}
                        
                        {comentario && (
                            <div style={{ background: '#333', padding: '8px 15px', borderRadius: '20px' }}>
                                <span style={{ color: '#FFD700' }}>Comentario:</span> {comentario}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}