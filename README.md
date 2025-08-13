# Pollería y Parrilladas 3 Sabores - Proyecto React
Esta es una aplicación web para una pollería y parrillada, desarrollada con React y React Router para la navegación, utilizando Bootstrap para el diseño responsivo.
## Prerrequisitos
Antes de comenzar, asegúrate de tener instalado:
•	Node.js (v18.0 o superior)
•	npm (v9.0 o superior) o Yarn (v1.22.0 o superior)
## Instalación
Sigue estos pasos para configurar el proyecto:
### 1.	Clona el repositorio:
git clone https://github.com/JorgeAbrahamCueto/reservas_grupo3

### 2.-Instala las dependencias:
npm install
## Configuración del entorno
El proyecto utiliza las siguientes dependencias principales:

    react (v18.2.0)
    react-router-dom (v6.22.3) para el enrutamiento
    bootstrap (v5.3.3) para estilos y componentes
    prop-types (v15.8.1) para validación de props
	
## Estructura de archivos
src/
├── components/
│   ├── Carta.jsx          # Componente del menú
│   ├── Contactos.jsx      # Formulario de contacto
│   ├── FlipCard.jsx       # Tarjetas interactivas (Inicio)
│   ├── Inicio.jsx         # Página principal
│   ├── Login.jsx          # Sistema de autenticación
│   ├── Mantemiento.jsx    # Panel de administración
│   ├── Navegacion.jsx     # Barra de navegación
│   ├── Nosotros.jsx       # Sección "Sobre nosotros"
│   ├── ReservaCliente.jsx # Reportes de reservas
│   └── Reservas.jsx       # Sistema de reservas
├── styles/
│   └── style.css          # Estilos personalizados
└── App.js                 # Configuración principal de rutas
## Ejecutar la aplicación
Para iniciar el servidor de desarrollo:
npm start
La aplicación estará disponible en: http://localhost:3000
## Funcionalidades principales
### Navegación:
- Menú responsive con rutas para todas las secciones
- Enrutamiento con React Router
### Autenticación:
- Sistema de login/registro
- Acceso al panel de administración
- Persistencia de sesión con localStorage
### Reservas
- Selección de fecha, hora y mesa
- Visualización de disponibilidad en tiempo real
- Formulario de datos del cliente
- Confirmación de reserva
### Administración:
- Gestión de mesas (agregar/eliminar/bloquear)
- Configuración de horarios
- Generación de reportes
## Scripts disponibles
-     npm start: Inicia el servidor de desarrollo
-     npm run build: Crea una versión optimizada para producción
-     npm test: Ejecuta las pruebas (configurar previamente)
-     npm eject: Expone la configuración de Webpack (operación irreversible)
## Personalización
Para modificar los estilos:
1. Edita src/styles/style.css para estilos globales
1. Modifica los componentes individuales para estilos específicos
1. Sobreescribe variables de Bootstrap en src/index.js si es necesario
## Dependencias principales
"dependencies": {
  "bootstrap": "^5.3.3",
  "prop-types": "^15.8.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.3",
  "react-scripts": "5.0.1"
}
## Solución de problemas comunes
### Errores de dependencias:
rm -rf node_modules package-lock.json
npm install
### Problemas con Bootstrap:
Asegúrate de tener importados los archivos CSS y JS en src/index.js:
mport 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
### Rutas no funcionando:
Verifica que todas las rutas estén correctamente definidas en src/App.js
## Contribuir
-     Haz un fork del proyecto
-     Crea una rama para tu feature (git checkout -b feature/nueva-funcionalidad)
-     Haz commit de tus cambios (git commit -m 'Agregar nueva funcionalidad')
-     Haz push a la rama (git push origin feature/nueva-funcionalidad)
-     Abre un Pull Request
## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles