import React from 'react';

export const Login = () => {
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [email, setEmail] = React.useState(() => localStorage.getItem('email') || '');
  const [password, setPassword] = React.useState('');
  const [users, setUsers] = React.useState(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  });

  const [loggedIn, setLoggedIn] = React.useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (users.find(u => u.email === email)) {
        alert('El usuario ya existe');
        return;
      }
      const newUsers = [...users, { email, password }];
      setUsers(newUsers);
      alert('Usuario registrado correctamente');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('email', email);
      } else {
        alert('Credenciales incorrectas');
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');
    setPassword('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
  };

  if (loggedIn) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #b71c1c 100%)'
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: '100%',
            background: 'white',
            borderRadius: 10,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            padding: 20,
            textAlign: 'center'
          }}
        >
          Bienvenido, {email}! Ahora puedes acceder a:
          <br />
          <a href="/Mantemiento" style={{ color: '#b71c1c', fontWeight: 'bold', display: 'block', margin: '16px 0' }}>
            Ir a Mantenimiento
          </a>
          <a href="/reservascliente" style={{ color: '#b71c1c', fontWeight: 'bold', display: 'block', margin: '16px 0' }}>
            Ir a Reportes
          </a>
          <button onClick={handleLogout} style={{ marginTop: 20, fontWeight: 'bold', color: '#b71c1c' }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #b71c1c 100%)'
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: '100%',
          background: 'white',
          borderRadius: 10,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          padding: 20
        }}
      >
        <h2>{isRegistering ? 'Registro' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">{isRegistering ? 'Registrarse' : 'Ingresar'}</button>
        </form>
        <button onClick={() => setIsRegistering(!isRegistering)} style={{ marginTop: 10 }}>
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo usuario? Regístrate'}
        </button>
        <button
          onClick={() => window.location.href = '/'}
          style={{ marginTop: 10, background: '#eee', color: '#b71c1c', fontWeight: 'bold', width: '100%' }}
        >
          Salir
        </button>
      </div>
    </div>
  );
};