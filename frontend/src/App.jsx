import { useState, useEffect } from 'react';
import { API_URL } from './services/api';
import { ListaVideojuegos } from './components/ListaVideojuegos';
import { FormularioVideojuego } from './components/FormularioVideojuego';

function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem("apiKey") || "");

  useEffect(() => {
    fetch(`${API_URL}/videojuegos`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then(data => {
        setVideojuegos(data);
        setError(null);
      })
      .catch(() => setError('No se ha podido conectar con el servidor.'))
      .finally(() => setCargando(false));
  }, []);

  const guardarApiKey = (valor) => {
    setApiKey(valor);
    sessionStorage.setItem("apiKey", valor);
  };

  const manejarCrear = async (nuevoJuego) => {
    try {
      const respuesta = await fetch(`${API_URL}/videojuegos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(nuevoJuego)
      });

      if (!respuesta.ok) {
        if (respuesta.status === 401) throw new Error('Falta la API Key o es incorrecta.');
        throw new Error('Error al crear el juego');
      }

      const juegoCreado = await respuesta.json();
      setVideojuegos([...videojuegos, juegoCreado]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este juego?")) return;
    try {
      const res = await fetch(`${API_URL}/videojuegos/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': apiKey }
      });
      if (!res.ok) throw new Error('Error de permisos al eliminar');
      
      setVideojuegos(actuales => actuales.filter(j => j.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarToggle = async (id, estadoActual) => {
    try {
      const res = await fetch(`${API_URL}/videojuegos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ terminado: !estadoActual })
      });
      if (!res.ok) throw new Error('Error al modificar');
      
      const juegoActualizado = await res.json();
      setVideojuegos(actuales => actuales.map(j => j.id === id ? juegoActualizado : j));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Mis Videojuegos</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Contraseña (API Key): </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => guardarApiKey(e.target.value)}
        />
      </div>

      <FormularioVideojuego onCrear={manejarCrear} />

      {cargando && <p>Cargando...</p>}
      
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#fee', color: 'red', marginBottom: '15px' }}>
          <p>{error}</p>
        </div>
      )}

      {!cargando && <ListaVideojuegos videojuegos={videojuegos}
        onEliminar={manejarEliminar}
        onToggle={manejarToggle} />}
    </main>
  );
}

export default App;