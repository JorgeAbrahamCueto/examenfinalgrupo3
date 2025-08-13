import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const Mantemiento = () => {
  const navigate = useNavigate();

  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevaMesa, setNuevaMesa] = useState('');
  const [horario] = useState({ apertura: '09:00', cierre: '22:00' });
  const [reporte, setReporte] = useState(null);
  const [pisoSeleccionado, setPisoSeleccionado] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const menu = document.querySelector('nav');
    if (menu) menu.style.display = 'none';
    return () => { if (menu) menu.style.display = ''; };
  }, []);

  const fetchMesas = async (forzar = false) => {
    try {
      setLoading(true);
      const url = "http://localhost/idatrestaurant2025/public/api/mantenimientomesas";
      const options = forzar ? { headers: { 'Cache-Control': 'no-cache' } } : {};
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);

      const data = await response.json();
      const mesasFormateadas = data.map(mesa => ({
        id: mesa.idMesamantenimiento,
        nombre: mesa.nombreMesa,
        piso: mesa.pisoMesa,
        estado: mesa.estadoMesa?.trim(),
        ultimaModificacion: mesa.updated_at || new Date().toISOString()
      }));

      setMesas(mesasFormateadas);
      setUltimaActualizacion(new Date().toISOString());
      setError(null);
    } catch (err) {
      console.error("Error al obtener mesas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesas();
    const intervalo = setInterval(() => fetchMesas(true), 30000);
    return () => clearInterval(intervalo);
  }, []);

  const agregarMesa = async () => {
    if (!nuevaMesa.trim()) {
      alert("Por favor ingrese un nombre para la mesa");
      return;
    }

    try {
      const response = await fetch("http://localhost/idatrestaurant2025/public/api/mantenimientomesas", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          nombreMesa: nuevaMesa.trim(),
          pisoMesa: `Piso ${pisoSeleccionado}`,
          estadoMesa: "Disponible",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al agregar mesa");
      }

      setNuevaMesa('');
      await fetchMesas(true);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const toggleBloqueo = async (e, id) => {
    e.preventDefault();
    try {
      const mesaActual = mesas.find(m => m.id === id);
      if (!mesaActual) throw new Error("Mesa no encontrada");

      const nuevoEstado = mesaActual.estado === "Bloqueado" ? "Disponible" : "Bloqueado";

      setMesas(prev =>
        prev.map(m =>
          m.id === id ? { ...m, estado: nuevoEstado, ultimaModificacion: new Date().toISOString() } : m
        )
      );

      const response = await fetch(
        `http://localhost/idatrestaurant2025/public/api/mantenimientomesas/${id}/estado`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ estadoMesa: nuevoEstado }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta del servidor:", errorText);
        setMesas(prev => prev.map(m => (m.id === id ? mesaActual : m)));
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      if (result.data) {
        setMesas(prev =>
          prev.map(m =>
            m.id === id
              ? { ...m, estado: result.data.estadoMesa?.trim(), ultimaModificacion: result.data.updated_at || new Date().toISOString() }
              : m
          )
        );
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert(`Error al actualizar: ${error.message}`);
    }
  };

  const generarReporte = () => {
    const bloqueadas = mesas.filter(m => m.estado === "Bloqueado").length;
    setReporte({
      total: mesas.length,
      bloqueadas,
      disponibles: mesas.length - bloqueadas,
      horario
    });
  };

  const exportarExcel = () => {
    try {
      const datos = mesas.map(m => ({
        ID: m.id,
        Nombre: m.nombre,
        Piso: m.piso,
        Estado: m.estado,
        "Última Modificación": m.ultimaModificacion ? new Date(m.ultimaModificacion).toLocaleString() : 'N/A'
      }));

      const hoja = XLSX.utils.json_to_sheet(datos);
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, "Mesas");

      const archivo = XLSX.write(libro, { bookType: "xlsx", type: "array" });
      const blob = new Blob([archivo], { type: "application/octet-stream" });
      saveAs(blob, `Reporte_Mesas_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      alert("Error al generar el archivo Excel");
    }
  };

  const mesasFiltradas = mesas
    .filter(m => parseInt(m.piso.replace("Piso ", "")) === pisoSeleccionado)
    .filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const dashboardStyle = { minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #b71c1c 100%)', padding: '40px 0' };
  const containerStyle = { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 32, maxWidth: 1200, margin: '0 auto', alignItems: 'flex-start' };
  const responsiveContainerStyle = isMobile ? { display: 'block', maxWidth: '100%', padding: '0 8px' } : containerStyle;
  const cardStyle = { background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24, marginBottom: 24 };
  const responsiveCardStyle = isMobile ? { ...cardStyle, marginBottom: 24, padding: 16 } : cardStyle;
  const buttonStyle = { background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', marginRight: 8, fontSize: isMobile ? '14px' : '16px' };
  const statBox = { background: '#f1f5f9', borderRadius: 8, padding: 16, marginBottom: 16, textAlign: 'center' };
  const inputStyle = { padding: '8px 12px', borderRadius: 6, border: '1px solid #c7d2fe', flex: 1, fontSize: isMobile ? '14px' : '16px' };
  const selectStyle = { marginLeft: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #c7d2fe', minWidth: 90, fontSize: isMobile ? '14px' : '16px' };
  const inputGroupStyle = isMobile ? { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 } : { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 };

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: 20 }}>Cargando mesas...</div>;
  if (error) return <div style={{ color: '#fff', textAlign: 'center', padding: 20 }}>Error: {error}</div>;

  return (
    <div style={dashboardStyle}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 32, fontSize: isMobile ? '1.5rem' : '2rem' }}>Dashboard de Mantenimiento de Mesas</h2>
      <div style={{ color: '#fff', textAlign: 'center', fontSize: '0.875rem', marginBottom: 16 }}>
        Última actualización: {ultimaActualizacion ? new Date(ultimaActualizacion).toLocaleString() : 'Nunca'}
      </div>

      <div style={responsiveContainerStyle}>
        <div>
          <div style={responsiveCardStyle}>
            <h3 style={{ color: '#3730a3', marginBottom: 16 }}>Estadísticas</h3>
            <div style={statBox}><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{mesas.length}</div><div>Total Mesas</div></div>
            <div style={statBox}><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{mesas.filter(m => m.estado === "Bloqueado").length}</div><div>Bloqueadas</div></div>
            <div style={statBox}><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{mesas.filter(m => m.estado === "Disponible").length}</div><div>Disponibles</div></div>
          </div>
        </div>

        <div>
          <div style={responsiveCardStyle}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 20 }}>
              <label>Piso:<select value={pisoSeleccionado} onChange={e => setPisoSeleccionado(Number(e.target.value))} style={selectStyle}>
                <option value={1}>Piso 1</option><option value={2}>Piso 2</option><option value={3}>Piso 3</option>
              </select></label>
              <input type="text" placeholder="Buscar mesa..." value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...inputStyle, width: isMobile ? '100%' : 220 }} />
            </div>

            <div style={inputGroupStyle}>
              <input type="text" placeholder="Nombre de la mesa" value={nuevaMesa} onChange={e => setNuevaMesa(e.target.value)} style={inputStyle} />
              <button onClick={agregarMesa} style={{ ...buttonStyle, background: '#6366f1' }}>Agregar Mesa</button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button onClick={exportarExcel} style={{ ...buttonStyle, background: '#22c55e', flex: 1 }}>📥 Exportar a Excel</button>
              <button onClick={() => fetchMesas(true)} style={{ ...buttonStyle, background: '#f59e0b', flex: 1 }}>🔄 Actualizar</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '100%' : 600 }}>
                <thead><tr style={{ background: '#f1f5f9' }}><th>Nombre</th><th>Piso</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>
                  {mesasFiltradas.map(mesa => (
                    <tr key={mesa.id}>
                      <td>{mesa.nombre}</td>
                      <td>{mesa.piso}</td>
                      <td>{mesa.estado === "Bloqueado" ? <span style={{ color: 'red', fontWeight: 'bold' }}>BLOQUEADO</span> : <span style={{ color: 'green' }}>Disponible</span>}</td>
                      <td>
                        <button
                          onClick={(e) => toggleBloqueo(e, mesa.id)}
                          style={{
                            ...buttonStyle,
                            background: mesa.estado === "Bloqueado" ? '#4CAF50' : '#F44336'
                          }}
                        >
                          {mesa.estado === "Bloqueado" ? 'DESBLOQUEAR' : 'BLOQUEAR'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {mesasFiltradas.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>No hay mesas para mostrar.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div style={responsiveCardStyle}>
            <h3 style={{ color: '#3730a3', marginBottom: 16 }}>Reporte</h3>
            <button onClick={generarReporte} style={{ ...buttonStyle, width: '100%', marginBottom: 16 }}>Generar Reporte</button>
            {reporte && (
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
                <p>Total de mesas: <b>{reporte.total}</b></p>
                <p>Mesas bloqueadas: <b style={{ color: '#ef4444' }}>{reporte.bloqueadas}</b></p>
                <p>Mesas disponibles: <b style={{ color: '#22c55e' }}>{reporte.disponibles}</b></p>
                <p>Horario: <b>{reporte.horario.apertura} - {reporte.horario.cierre}</b></p>
              </div>
            )}
          </div>
          <div style={responsiveCardStyle}>
            <button onClick={() => navigate('/login')} style={{ background: '#374151', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 24px', cursor: 'pointer', width: '100%' }}>
              Volver a Menú Principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
