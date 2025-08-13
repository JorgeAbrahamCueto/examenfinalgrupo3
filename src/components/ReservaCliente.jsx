import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importamos useNavigate

export const ReservaCliente = () => {
  const navigate = useNavigate(); // ✅ Para redireccionar
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

  // Estado para el formulario
  // (Eliminado porque no se usa)

    // Manejar cambios en el formulario
    // (Eliminado porque no se usa)

    // Manejar envio para formulario de reserva
    // (Eliminado porque no se usa)

    if (loading) return <p>Cargando datos...</p>;

  const reservas = reportereserva;
 // A futuro, puedes cargar desde localStorage o una API

  return (
    <div>
      <div className="container mt-4">
        <h2 className="mb-4">Reporte de Reservas del Cliente</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Piso</th>
                <th>Mesa</th>
              </tr>
            </thead>
            <tbody>
  {reservas.map((reserva) => (
    <tr key={reserva.idReserva}>
      <td>{reserva.id_Reservas}</td> {/* ✅ ID en la primera columna */}
      <td>{reserva.idCliente}</td>
      <td>{reserva.fecha_Reservas}</td>
      <td>{reserva.hora_Reservas}</td>
      <td>{reserva.idMesamantenimiento}</td>
      <td>{reserva.idMesamantenimiento}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        

        {/* ✅ Botón para volver al menú principal */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')}
            style={{
              background: '#374151',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer'
            }}
            
          >
            Volver a Menú Principal
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReservaCliente;