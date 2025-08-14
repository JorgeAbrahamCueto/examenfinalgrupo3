import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componente para mostrar y seleccionar las mesas
function SelectorMesas({ mesas, piso, seleccionadas, mesasBloqueadas, onSeleccionMesa, fecha, hora, advertencia }) {
    return (
        <div className="row">
            {mesas
                .filter((mesa) => mesa.pisoMesa === `Piso ${piso}`)
                .map((mesa) => {
                    // ✅ CORRECCIÓN: Una mesa está bloqueada si su estado es 'Bloqueado' O si su ID está en la lista de reservas.
                    const isManuallyBlocked = mesa.estadoMesa?.trim() === 'Bloqueado';
                    const isReservationBlocked = mesasBloqueadas.includes(mesa.idMesamantenimiento);
                    const bloqueada = isManuallyBlocked || isReservationBlocked;
                    
                    const seleccionada = seleccionadas.includes(mesa.idMesamantenimiento);
                    
                    return (
                        <div className="col-2 mb-3 d-flex justify-content-center" key={mesa.idMesamantenimiento}>
                            <button
                                className={`mesa-icon-btn`}
                                disabled={bloqueada || !fecha || !hora || advertencia}
                                onClick={() => onSeleccionMesa(mesa.idMesamantenimiento)}
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: '50%',
                                    background: bloqueada ? '#000' : seleccionada ? '#FF9933' : '#181818',
                                    color: '#fff',
                                    border: seleccionada ? '2px solid #FF9903' : '1px solid #444',
                                    boxShadow: seleccionada ? '0 0 8px 2px #FF990088' : undefined,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    position: 'relative',
                                    transition: 'background 0.2s, border 0.2s',
                                    padding: 0,
                                }}
                                title={`Mesa ${mesa.nombreMesa} - ${bloqueada ? 'No disponible' : 'Disponible'}`}
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" style={{ marginBottom: 2 }}>
                                    {mesa.idMesamantenimiento % 2 === 1 && (
                                        <rect x="0" y="0" width="4" height="32" fill="#4FC3F7" rx="2" />
                                    )}
                                    {mesa.idMesamantenimiento % 2 === 0 && (
                                        <rect x="28" y="0" width="4" height="32" fill="#A1887F" rx="2" />
                                    )}
                                    <ellipse cx="16" cy="16" rx="13" ry="7" fill={bloqueada ? "#333" : seleccionada ? "#FFD580" : "#fff"} stroke={seleccionada ? "#FF9903" : "#888"} strokeWidth="2" />
                                    <rect x="8" y="23" width="2" height="6" fill="#888" rx="1"/>
                                    <rect x="22" y="23" width="2" height="6" fill="#888" rx="1"/>
                                </svg>
                                <span style={{ fontSize: 12, color: bloqueada ? "#888" : "#fff", fontWeight: seleccionada ? "bold" : "normal" }}>
                                    {mesa.nombreMesa}
                                </span>
                                {bloqueada && (
                                    <span style={{ position: 'absolute', top: -8, right: -8, background: '#ff0000', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>
                                        !
                                    </span>
                                )}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}

// Componente para el formulario de datos del cliente
function FormularioCliente({ cliente, onChange, onSiguiente, onVolver, textoBotonSiguiente = "Siguiente" }) {
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!cliente.nombre_Cliente || !cliente.dni_Cliente) {
            setError('Nombre y DNI son campos obligatorios.');
            return;
        }
        if (!/^\d{8}$/.test(cliente.dni_Cliente)) {
            setError('El DNI debe tener 8 dígitos.');
            return;
        }
        if (cliente.email_Cliente && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email_Cliente)) {
            setError('Ingrese un email válido.');
            return;
        }

        setError(null);
        try {
            await onSiguiente();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="mt-4">
            <h4 style={{ color: '#fff' }}>Paso 2: Ingresa tus Datos</h4>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>Nombre *</label>
                        <input type="text" className="form-control" name="nombre_Cliente" value={cliente.nombre_Cliente} onChange={onChange} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} required />
                    </div>
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>DNI *</label>
                        <input type="text" className="form-control" name="dni_Cliente" value={cliente.dni_Cliente} onChange={onChange} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} required maxLength="8" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>Email</label>
                        <input type="email" className="form-control" name="email_Cliente" value={cliente.email_Cliente} onChange={onChange} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                    </div>
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>Teléfono</label>
                        <input type="tel" className="form-control" name="telefono_Cliente" value={cliente.telefono_Cliente} onChange={onChange} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                    </div>
                </div>
                <div className="mb-3">
                    <label style={{ color: '#fff' }}>Requerimientos adicionales</label>
                    <textarea className="form-control" name="Requerimientos" rows="3" value={cliente.Requerimientos} onChange={onChange} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={onVolver} style={{ flex: 1, marginRight: 8, background: '#444', border: '1px solid #666' }}>
                        Volver
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#FF9903', border: 'none' }}>
                        {textoBotonSiguiente}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Componente principal de la página de Reservas
export const Reservas = () => {
    const [paso, setPaso] = useState(1);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [advertencia, setAdvertencia] = useState('');
    const [personas, setPersonas] = useState('1');
    const [piso, setPiso] = useState('1');
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mesasBloqueadas, setMesasBloqueadas] = useState([]);
    const [cliente, setCliente] = useState({
        nombre_Cliente: '',
        dni_Cliente: '',
        email_Cliente: '',
        telefono_Cliente: '',
        Requerimientos: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mesasResponse = await fetch('http://localhost/idatrestaurant2025/public/api/mantenimientomesas');
                if (!mesasResponse.ok) throw new Error(`Error HTTP al obtener mesas: ${mesasResponse.status}`);
                const mesasData = await mesasResponse.json();
                setMesas(mesasData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchMesasBloqueadas = async () => {
            setMesasBloqueadas([]);
            if (!fecha || !hora) return;
            try {
                const response = await fetch('http://localhost/idatrestaurant2025/public/api/mesas-bloqueadas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ fecha, hora })
                });
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                const data = await response.json();
                if (data.success) {
                    setMesasBloqueadas(data.data);
                } else {
                    console.error('Error del servidor al obtener mesas bloqueadas:', data.error);
                }
            } catch (err) {
                console.error('Error en fetch de mesas bloqueadas:', err);
            }
        };
        fetchMesasBloqueadas();
    }, [fecha, hora]);

    const handleSeleccionMesa = (id) => {
        if (!fecha || !hora || advertencia) return;
        setSeleccionadas(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
    };

    const handleSiguientePaso = () => {
        if (!fecha || !hora || seleccionadas.length === 0 || advertencia) {
            alert("Por favor, selecciona una fecha, hora y al menos una mesa para continuar.");
            return;
        }
        if (seleccionadas.some(id => mesasBloqueadas.includes(id))) {
            alert('Una o más mesas seleccionadas ya no están disponibles. Por favor, elija otras.');
            setSeleccionadas([]);
            return;
        }
        setPaso(2);
    };

    const handleConfirmarReserva = async () => {
        let nuevoClienteId;
        try {
            const clienteResponse = await fetch('http://localhost/idatrestaurant2025/public/api/cliente_reserva', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    nombre_Cliente: cliente.nombre_Cliente,
                    dni_Cliente: cliente.dni_Cliente,
                    email_Cliente: cliente.email_Cliente || null,
                    telefono_Cliente: cliente.telefono_Cliente || null,
                    Requerimientos: cliente.Requerimientos || null
                })
            });
            const clienteData = await clienteResponse.json();
            if (!clienteResponse.ok) {
                if (clienteResponse.status === 422 && clienteData.errors) {
                    throw new Error(Object.values(clienteData.errors).flat().join('\n'));
                }
                throw new Error(clienteData.message || 'Error al crear el cliente.');
            }
            if (!clienteData.data || !clienteData.data.idCliente) {
                throw new Error('La API no devolvió el ID del cliente.');
            }
            nuevoClienteId = clienteData.data.idCliente;
        } catch (error) {
            console.error('Fallo al crear cliente:', error);
            throw error;
        }

        try {
            const reservaResponse = await fetch('http://localhost/idatrestaurant2025/public/api/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    idCliente: nuevoClienteId,
                    mesas: seleccionadas,
                    fecha_Reservas: fecha,
                    hora_Reservas: hora,
                    cantidad_personas: parseInt(personas, 10),
                })
            });
            if (!reservaResponse.ok) {
                const errorData = await reservaResponse.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al crear la reserva.');
            }
            alert('¡Reserva creada exitosamente!');
            setCliente({ nombre_Cliente: '', dni_Cliente: '', email_Cliente: '', telefono_Cliente: '', Requerimientos: '' });
            setSeleccionadas([]);
            setFecha('');
            setHora('');
            setPersonas('1');
            setAdvertencia('');
            setPaso(1);
        } catch (error) {
            console.error('Fallo al crear reserva:', error);
            alert(`Se creó el cliente, pero no se pudo completar la reserva. Error: ${error.message}`);
        }
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#181818' }}> <div className="spinner-border text-primary" role="status"></div> </div>;
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#181818' }}> <div className="alert alert-danger">Error: {error}</div> </div>;

    return (
        <div style={{ background: 'linear-gradient(200deg, #000000 0%, #CC3300 100%)', minHeight: '100vh', padding: '20px', color: '#fff' }}>
            <div className="container">
                <h2 className="mb-4" style={{ textShadow: '1px 1px 4px #000' }}>Reserva de Mesas</h2>
                {paso === 1 ? (
                    <>
                        <h4 style={{ color: '#fff' }}>Paso 1: Elige tu mesa</h4>
                        <div className="row mb-4">
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Personas</label>
                                <select className="form-select" value={personas} onChange={(e) => setPersonas(e.target.value)} style={{ background: '#222', color: '#fff', border: '1px solid #444' }}>
                                    {[...Array(8)].map((_, i) => ( <option key={i+1} value={i+1}>{i+1}</option> )) }
                                    <option value="8+">8+</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Fecha</label>
                                <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Hora</label>
                                <input type="time" className="form-control" value={hora} onChange={(e) => {
                                    const nuevaHora = e.target.value;
                                    setHora(nuevaHora);
                                    const horaSeleccionada = parseInt(nuevaHora.split(':')[0], 10);
                                    setAdvertencia(horaSeleccionada < 12 ? '⚠️ La atención es a partir del mediodía (12:00 PM).' : '');
                                }} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                                {advertencia && ( <div className="alert alert-warning mt-2 small p-2"> {advertencia} </div> )}
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Piso</label>
                                <select className="form-select" value={piso} onChange={(e) => setPiso(e.target.value)} style={{ background: '#222', color: '#fff', border: '1px solid #444' }} >
                                    {[1, 2, 3].map(num => ( <option key={num} value={num}>Piso {num}</option> ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <SelectorMesas mesas={mesas} piso={piso} seleccionadas={seleccionadas} mesasBloqueadas={mesasBloqueadas} onSeleccionMesa={handleSeleccionMesa} fecha={fecha} hora={hora} advertencia={advertencia} />
                            <div className="d-flex mt-3" style={{ color: '#fff', fontSize: '0.9rem' }}>
                                <div className="d-flex align-items-center me-4"><div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FF9933', marginRight: '6px' }}></div><span>Seleccionada</span></div>
                                <div className="d-flex align-items-center me-4"><div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#000', marginRight: '6px' }}></div><span>No disponible</span></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" disabled={!fecha || !hora || seleccionadas.length === 0 || advertencia} onClick={handleSiguientePaso} style={{ background: '#FF9903', border: 'none', borderRadius: '30px', padding: '10px 30px', fontWeight: 'bold', opacity: (!fecha || !hora || seleccionadas.length === 0 || advertencia) ? 0.5 : 1 }}>
                                Siguiente
                            </button>
                        </div>
                    </>
                ) : (
                    <FormularioCliente
                        cliente={cliente}
                        onChange={(e) => {
                            const { name, value } = e.target;
                            setCliente(prev => ({ ...prev, [name]: value }));
                        }}
                        onSiguiente={handleConfirmarReserva}
                        onVolver={() => setPaso(1)}
                        textoBotonSiguiente="Confirmar Reserva"
                    />
                )}
            </div>
        </div>
    );
};

// PropTypes para los componentes
SelectorMesas.propTypes = {
    mesas: PropTypes.array.isRequired,
    piso: PropTypes.string.isRequired,
    seleccionadas: PropTypes.array.isRequired,
    mesasBloqueadas: PropTypes.array.isRequired,
    onSeleccionMesa: PropTypes.func.isRequired,
    fecha: PropTypes.string,
    hora: PropTypes.string,
    advertencia: PropTypes.string
};

FormularioCliente.propTypes = {
    cliente: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSiguiente: PropTypes.func.isRequired,
    onVolver: PropTypes.func.isRequired,
    textoBotonSiguiente: PropTypes.string
};
