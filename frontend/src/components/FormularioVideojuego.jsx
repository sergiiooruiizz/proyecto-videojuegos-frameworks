import { useState } from 'react';

export function FormularioVideojuego({ onCrear }) {
    const [datos, setDatos] = useState({
    titulo: '',
    genero: '',
    terminado: false,
    plataformaId: 1
    });

    const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({
        ...datos,
        [name]: type === 'checkbox' ? checked : value
    });
    };

    const manejarEnvio = (e) => {
    e.preventDefault();
    onCrear({ ...datos, plataformaId: Number(datos.plataformaId) });
    };

    return (
    <form onSubmit={manejarEnvio} style={{ border: '1px solid #aaa', padding: '15px', marginBottom: '20px' }}>
        <h2>Nuevo Videojuego</h2>
        <div>
        <label>Título: <input name="titulo" value={datos.titulo} onChange={manejarCambio} required /></label>
        </div>
        <div>
        <label>Género: <input name="genero" value={datos.genero} onChange={manejarCambio} required /></label>
        </div>
        <div>
        <label>Plataforma (ID): <input type="number" name="plataformaId" value={datos.plataformaId} onChange={manejarCambio} required /></label>
        </div>
        <div>
        <label>Terminado: <input type="checkbox" name="terminado" checked={datos.terminado} onChange={manejarCambio} /></label>
        </div>
        <button type="submit">Añadir juego</button>
    </form>
    );
}