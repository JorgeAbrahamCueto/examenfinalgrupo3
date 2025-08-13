import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import{ Nosotros } from './components/Nosotros';
import { Contactos } from './components/Contactos';
import { Carta } from './components/Carta';
import { Navegacion } from './components/Navegacion';
import { Reservas } from './components/Reservas';
import { ReservaCliente } from './components/ReservaCliente';
import { Mantemiento } from './components/Mantemiento';
import { Login } from './components/Login';
import { Combinalo } from './components/Combinalo';
import { Carretillero } from './components/Carretillero';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

 // Bootstrap
import './styles/style.css'; // estilos personalizados

export const App = () => {
  return (
	<Router>
	  
		<Navegacion></Navegacion>
		<Routes>
		  <Route path="/" element={<Inicio></Inicio>} /> 
	  <Route path="/nosotros" element={<Nosotros></Nosotros>} />
	  <Route path="/contactos" element={<Contactos></Contactos>} />
	  <Route path="/carta" element={<Carta></Carta>} />
	  <Route path="/reservas" element={<Reservas></Reservas>} />
	  <Route path="/reservascliente" element={<ReservaCliente></ReservaCliente>} />
	  <Route path="/mantemiento" element={<Mantemiento></Mantemiento>} />
	  <Route path="/login" element={<Login></Login>} />
	  <Route path="/combinalo" element={<Combinalo></Combinalo>} />
	  <Route path="/carretillero" element={<Carretillero></Carretillero>} />
	  
			</Routes>
		
		 </Router>
  )
}

export default App;
