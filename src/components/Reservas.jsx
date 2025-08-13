import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Selector de mesas
function SelectorMesas({ mesas, piso, seleccionadas, mesasBloqueadas, onSeleccionMesa, fecha, hora, advertencia }) {
    return (
        <div className="row">
            {mesas
                .filter((mesa) => mesa.pisoMesa === `Piso ${piso}`)
                .map((mesa) => {
                    const bloqueada = mesasBloqueadas.includes(mesa.idMesamantenimiento);
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
                                    background: bloqueada
                                        ? '#000'
                                        : seleccionada
                                        ? '#FF9933'
                                        : '#181818',
                                    color: '#fff',
                                    border: seleccionada
                                        ? '2px solid #FF9903'
                                        : '1px solid #444',
                                    boxShadow: seleccionada
                                        ? '0 0 8px 2px #FF990088'
                                        : undefined,
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
                                    <ellipse
                                        cx="16"
                                        cy="16"
                                        rx="13"
                                        ry="7"
                                        fill={bloqueada ? "#333" : seleccionada ? "#FFD580" : "#fff"}
                                        stroke={seleccionada ? "#FF9903" : "#888"}
                                        strokeWidth="2"
                                    />
                                    <rect x="8" y="23" width="2" height="6" fill="#888" rx="1"/>
                                    <rect x="22" y="23" width="2" height="6" fill="#888" rx="1"/>
                                </svg>
                                <span style={{
                                    fontSize: 12,
                                    color: bloqueada ? "#888" : "#fff",
                                    fontWeight: seleccionada ? "bold" : "normal"
                                }}>
                                    {mesa.nombreMesa}
                                </span>
                                {bloqueada && (
                                    <span style={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        background: '#ff0000',
                                        color: '#fff',
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 10,
                                        fontWeight: 'bold'
                                    }}>
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

// Popup de confirmación
function PopupConfirmacion({ fecha, hora, personas, piso, seleccionadas, onConfirmar, onCancelar }) {
    return (
        <div
            className="popup-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <div
                className="popup-content"
                style={{
                    background: '#222',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '32px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    minWidth: '320px',
                    maxWidth: '90vw',
                }}
            >
                <h4>Confirmación de Reserva</h4>
                <p><strong>Fecha:</strong> {fecha}</p>
                <p><strong>Hora:</strong> {hora}</p>
                <p><strong>Personas:</strong> {personas}</p>
                <p><strong>Piso:</strong> {piso}</p>
                <p>
                    <strong>Mesas seleccionadas:</strong>{" "}
                    {seleccionadas.join(", ")}
                </p>
                <p className="text-warning">
                    ⚠ Tolerancia máxima de <strong>15 minutos</strong> después de la hora indicada.
                </p>
                <div className="d-flex justify-content-between mt-4">
                    <button 
                        className="btn btn-success" 
                        onClick={onConfirmar}
                        style={{ flex: 1, marginRight: 8 }}
                    >
                        Confirmar
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={onCancelar}
                        style={{ flex: 1, marginLeft: 8 }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

PopupConfirmacion.propTypes = {
    fecha: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
    personas: PropTypes.string.isRequired,
    piso: PropTypes.string.isRequired,
    seleccionadas: PropTypes.array.isRequired,
    onConfirmar: PropTypes.func.isRequired,
    onCancelar: PropTypes.func.isRequired
};

// Formulario de cliente
function FormularioCliente({ cliente, onChange, onEnviar, onCancelar }) {
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!cliente.nombre_Cliente || !cliente.dni_Cliente) {
            setError('Nombre y DNI son campos obligatorios');
            return;
        }

        if (!/^\d{8}$/.test(cliente.dni_Cliente)) {
            setError('El DNI debe tener 8 dígitos');
            return;
        }

        if (cliente.email_Cliente && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email_Cliente)) {
            setError('Ingrese un email válido');
            return;
        }

        setError(null);
        onEnviar();
    };

    return (
        <div className="mt-4">
            <h4 style={{ color: '#fff' }}>Datos del Cliente</h4>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>Nombre *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre_Cliente"
                            value={cliente.nombre_Cliente}
                            onChange={onChange}
                            style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>DNI *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="dni_Cliente"
                            value={cliente.dni_Cliente}
                            onChange={onChange}
                            style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                            required
                            maxLength="8"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email_Cliente"
                            value={cliente.email_Cliente}
                            onChange={onChange}
                            style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label style={{ color: '#fff' }}>Teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="telefono_Cliente"
                            value={cliente.telefono_Cliente}
                            onChange={onChange}
                            style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label style={{ color: '#fff' }}>Requerimientos adicionales</label>
                    <textarea
                        className="form-control"
                        name="Requerimientos"
                        rows="3"
                        value={cliente.Requerimientos}
                        onChange={onChange}
                        style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1, marginRight: 8, background: '#FF9903', border: 'none' }}
                    >
                        Confirmar Reserva
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancelar}
                        style={{ flex: 1, marginLeft: 8, background: '#444', border: '1px solid #666' }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

FormularioCliente.propTypes = {
    cliente: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onEnviar: PropTypes.func.isRequired,
    onCancelar: PropTypes.func.isRequired
};

export const Reservas = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [advertencia, setAdvertencia] = useState('');
    const [personas, setPersonas] = useState('1');
    const [piso, setPiso] = useState('1');
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mesas, setMesas] = useState([]);
    const [reservas, setReservas] = useState([]);
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

    // Obtener mesas y reservas al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener mesas
        const [mesasResponse, reservasResponse] = await Promise.all([
            fetch('http://localhost/idatrestaurant2025/public/api/mantenimientomesas'),
            fetch('http://localhost/idatrestaurant2025/public/api/reservas')
        ]);

        // Verificar el tipo de contenido antes de parsear
        const mesasContentType = mesasResponse.headers.get('content-type');
        const reservasContentType = reservasResponse.headers.get('content-type');

        if (!mesasContentType || !mesasContentType.includes('application/json') ||
            !reservasContentType || !reservasContentType.includes('application/json')) {
            throw new Error('Respuesta no es JSON');
        }

        const [mesasData, reservasData] = await Promise.all([
            mesasResponse.json(),
            reservasResponse.json()
        ]);

        setMesas(mesasData);
        setReservas(reservasData);
        setLoading(false);
    } catch (err) {
        console.error('Error en fetchData:', err);
        setError(err.message);
        setLoading(false);
    }
};

        fetchData();
    }, []);

    // Actualizar mesas bloqueadas cuando cambia fecha/hora
    useEffect(() => {
        if (fecha && hora) {
            const horaSeleccionada = parseInt(hora.split(':')[0], 10);
            const horaFin = horaSeleccionada + 3;

            // Mesas bloqueadas por reservas
            const mesasReservadas = reservas
                .filter(reserva => {
                    if (reserva.fecha !== fecha) return false;
                    const horaReserva = parseInt(reserva.hora.split(':')[0], 10);
                    return horaSeleccionada < horaReserva + 3 && horaFin > horaReserva;
                })
                .map(r => r.mesa.id);

            // Mesas bloqueadas manualmente
            const mesasBloqueadasManual = mesas
                .filter(mesa => mesa.estadoMesa === 'Bloqueada')
                .map(mesa => mesa.idMesamantenimiento);

            setMesasBloqueadas([...new Set([...mesasReservadas, ...mesasBloqueadasManual])]);
        } else {
            setMesasBloqueadas([]);
        }
    }, [fecha, hora, reservas, mesas]);

    const handleSeleccionMesa = (id) => {
        if (!fecha || !hora || advertencia) return;
        setSeleccionadas(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const handleContinuar = () => {
        if (!fecha || !hora || seleccionadas.length === 0 || advertencia) return;
        
        // Verificar que ninguna mesa seleccionada esté bloqueada
        const hayMesasBloqueadas = seleccionadas.some(id => 
            mesasBloqueadas.includes(id)
        );
        
        if (hayMesasBloqueadas) {
            alert('Una o más mesas seleccionadas ya no están disponibles. Por favor, elija otras.');
            return;
        }
        
        setMostrarPopup(true);
    };

    const confirmarPopup = () => {
        setMostrarPopup(false);
        setMostrarFormulario(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCliente(prev => ({ ...prev, [name]: value }));
    };

    const handleEnviarReserva = async () => {
    try {
        // Validación
        if (!cliente.nombre_Cliente || !cliente.dni_Cliente) {
            throw new Error('Nombre y DNI son campos obligatorios');
        }

        if (!/^\d{8}$/.test(cliente.dni_Cliente)) {
            throw new Error('El DNI debe tener 8 dígitos');
        }

        // Preparar datos del cliente
        const datosCliente = {
            nombre_Cliente: cliente.nombre_Cliente,
            dni_Cliente: cliente.dni_Cliente.toString(), // Convertir a string
            email_Cliente: cliente.email_Cliente || '',
            telefono_Cliente: cliente.telefono_Cliente?.toString() || '', // Convertir a string
            Requerimientos: cliente.Requerimientos || ''
        };

        // Crear cliente
        const clienteResponse = await fetch('http://localhost/idatrestaurant2025/public/api/cliente_reserva', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datosCliente)
        });

        // Verificar si la respuesta es JSON
        const contentType = clienteResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await clienteResponse.text();
            console.error('Respuesta no es JSON:', textResponse);
            throw new Error('El servidor respondió con un formato inesperado');
        }

        const clienteData = await clienteResponse.json();

        if (!clienteResponse.ok) {
            throw new Error(clienteData.message || clienteData.error || 'Error al crear cliente');
        }

        if (!clienteData || !clienteData.data || !clienteData.data.idCliente) {
            throw new Error('Respuesta del servidor incompleta - falta ID del cliente');
        }

        // Crear reservas
        const reservaPromises = seleccionadas.map(mesaId =>
            fetch('http://localhost/idatrestaurant2025/public/api/reservas', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    idCliente: clienteData.data.idCliente,
                    idMesamantenimiento: mesaId,
                    fecha_Reservas: fecha,
                    hora_Reservas: hora,
                    cantidad_personas: personas
                })
            })
        );

        const responses = await Promise.all(reservaPromises);
        
        // Verificar todas las respuestas
        for (const response of responses) {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al crear una o más reservas');
            }
        }

        // Actualizar lista de reservas
        const nuevasReservasResponse = await fetch('http://localhost/idatrestaurant2025/public/api/reservas', {
            headers: { 'Accept': 'application/json' }
        });
        
        if (!nuevasReservasResponse.ok) {
            throw new Error('Error al actualizar la lista de reservas');
        }

        const nuevasReservas = await nuevasReservasResponse.json();
        setReservas(nuevasReservas);

        // Limpiar formulario y estado
        setCliente({
            nombre_Cliente: '',
            dni_Cliente: '',
            email_Cliente: '',
            telefono_Cliente: '',
            Requerimientos: '',
        });
        setSeleccionadas([]);
        setMostrarFormulario(false);
        setFecha('');
        setHora('');
        setPersonas('1');
        setAdvertencia('');

        alert('Reserva creada exitosamente!');

    } catch (error) {
        console.error('Error en handleEnviarReserva:', error);
        alert(`Error: ${error.message}`);
    }
};

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#181818'
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <span style={{ color: '#fff', marginLeft: '10px' }}>Cargando datos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                background: '#181818',
                color: '#fff'
            }}>
                <div className="alert alert-danger">
                    Error al cargar los datos: {error}
                </div>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.reload()}
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div style={{
            background: 'linear-gradient(200deg, #000000 0%, #CC3300 100%)',
            minHeight: '100vh',
            padding: '20px',
            color: '#fff'
        }}>
            <div className="container">
                <h2 className="mb-4" style={{ textShadow: '1px 1px 4px #000' }}>
                    Reserva de Mesas
                </h2>
                
                {!mostrarFormulario ? (
                    <>
                        <div className="row mb-4">
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Personas</label>
                                <select
                                    className="form-select"
                                    value={personas}
                                    onChange={(e) => setPersonas(e.target.value)}
                                    style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                                >
                                    {[...Array(8)].map((_, i) => (
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    ))}
                                    <option value="8+">8+</option>
                                </select>
                            </div>
                            
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Fecha</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                                />
                            </div>
                            
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Hora</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={hora}
                                    onChange={(e) => {
                                        const nuevaHora = e.target.value;
                                        setHora(nuevaHora);
                                        const horaSeleccionada = parseInt(nuevaHora.split(':')[0], 10);
                                        setAdvertencia(horaSeleccionada < 12 ? 
                                            '⚠️ La atención es a partir del mediodía (12:00 PM).' : '');
                                    }}
                                    style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                                />
                                {advertencia && (
                                    <div className="alert alert-warning mt-2 small p-2">
                                        {advertencia}
                                    </div>
                                )}
                            </div>
                            
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Piso</label>
                                <select
                                    className="form-select"
                                    value={piso}
                                    onChange={(e) => setPiso(e.target.value)}
                                    style={{ background: '#222', color: '#fff', border: '1px solid #444' }}
                                >
                                    {[1, 2, 3].map(num => (
                                        <option key={num} value={num}>Piso {num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <SelectorMesas
                                mesas={mesas}
                                piso={piso}
                                seleccionadas={seleccionadas}
                                mesasBloqueadas={mesasBloqueadas}
                                onSeleccionMesa={handleSeleccionMesa}
                                fecha={fecha}
                                hora={hora}
                                advertencia={advertencia}
                            />
                            
                            <div className="d-flex mt-3" style={{ color: '#fff', fontSize: '0.9rem' }}>
                                <div className="d-flex align-items-center me-4">
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: '#FF9933',
                                        marginRight: '6px'
                                    }}></div>
                                    <span>Seleccionada</span>
                                </div>
                                <div className="d-flex align-items-center me-4">
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: '#000',
                                        marginRight: '6px'
                                    }}></div>
                                    <span>No disponible</span>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-primary"
                                disabled={!fecha || !hora || seleccionadas.length === 0 || advertencia}
                                onClick={handleContinuar}
                                style={{
                                    background: '#FF9903',
                                    border: 'none',
                                    borderRadius: '30px',
                                    padding: '10px 30px',
                                    fontWeight: 'bold',
                                    opacity: (!fecha || !hora || seleccionadas.length === 0 || advertencia) ? 0.5 : 1
                                }}
                            >
                                Continuar
                            </button>
                            
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setFecha('');
                                    setHora('');
                                    setPersonas('1');
                                    setSeleccionadas([]);
                                    setAdvertencia('');
                                }}
                                style={{
                                    background: '#444',
                                    border: '1px solid #666',
                                    borderRadius: '30px',
                                    padding: '10px 30px'
                                }}
                            >
                                Limpiar
                            </button>
                        </div>
                    </>
                ) : (
                    <FormularioCliente
                        cliente={cliente}
                        onChange={handleInputChange}
                        onEnviar={handleEnviarReserva}
                        onCancelar={() => setMostrarFormulario(false)}
                    />
                )}

                {mostrarPopup && (
                    <PopupConfirmacion
                        fecha={fecha}
                        hora={hora}
                        personas={personas}
                        piso={piso}
                        seleccionadas={seleccionadas}
                        onConfirmar={confirmarPopup}
                        onCancelar={() => setMostrarPopup(false)}
                    />
                )}
            </div>
        </div>
    );
};