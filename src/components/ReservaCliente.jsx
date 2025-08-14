import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importamos useNavigate

export const ReservaCliente = () => {
  const navigate = useNavigate();
  const [reportereserva, setResevaCliente] = useState([]);
  const [loading, setLoading] = useState(true);

  // Oculta la barra de menú
  React.useEffect(() => {
    const menu = document.querySelector('nav, .navbar, #menu, header');
    if (menu) {
      menu.style.display = 'none';
    }
    return () => {
      if (menu) {
        menu.style.display = '';
      }
    };
  }, []);

  // Consumir API para obtener reservas
  useEffect(() => {
    fetch('http://localhost/idatrestaurant2025/public/api/reservas')
      .then((response) => response.json())
      .then((data) => {
        setResevaCliente(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al consumir API:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: "#fff", textAlign: "center" }}>Cargando datos...</p>;

  const reservas = reportereserva;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000 0%, #b71c1c 100%)",
        padding: "0",
        margin: "0"
      }}
    >
      <style>
        {`
          .reserva-table-container {
            background: rgba(255,255,255,0.10);
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.15);
            padding: 32px 24px;
            margin-top: 40px;
          }
          .reserva-table {
            background: rgba(30, 41, 59, 0.95);
            color: #fff;
            border-radius: 10px;
            overflow: hidden;
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
          }
          .reserva-table thead {
            background: linear-gradient(90deg, #485563 0%, #232526 100%);
          }
          .reserva-table th, .reserva-table td {
            padding: 12px 16px;
            text-align: center;
          }
          .reserva-table th {
            color: #fff;
            font-weight: 600;
            border-bottom: 2px solid #374151;
          }
          .reserva-table tbody tr {
            transition: background 0.2s;
          }
          .reserva-table tbody tr:nth-child(even) {
            background: rgba(55,65,81,0.7);
          }
          .reserva-table tbody tr:hover {
            background: #374151;
          }
          .reserva-title {
            color: #fff;
            text-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-weight: 700;
            letter-spacing: 1px;
          }
          .reserva-btn {
            background: #374151;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
          }
          .reserva-btn:hover {
            background: #485563;
          }
        `}
      </style>
      <div className="container reserva-table-container">
        <h2 className="mb-4 reserva-title">Reporte de Reservas del Cliente</h2>
        <div className="table-responsive">
          <table className="table reserva-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Piso</th>
                <th>Mesa</th>
                <th>Fecha de Creacion reserva</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.idReserva}>
                  <td>{reserva.id_Reservas}</td>
                  <td>{reserva.nombre_Cliente}</td>
                  <td>{reserva.fecha_Reservas}</td>
                  <td>{reserva.hora_Reservas}</td>
                  <td>{reserva.pisoMesa}</td>
                  <td>{reserva.nombreMesa}</td>
                  <td>{reserva.fecha_creacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button
            className="reserva-btn"
            onClick={() => navigate('/login')}
          >
            Volver a Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReservaCliente;