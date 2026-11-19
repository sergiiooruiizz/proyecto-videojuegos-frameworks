export function VideojuegoItem({ videojuego, onEliminar, onToggle }) {
    return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '10px' }}>
        <h3>{videojuego.titulo}</h3>
        <p><strong>Género:</strong> {videojuego.genero}</p>
        <p><strong>¿Terminado?:</strong> {videojuego.terminado ? 'Sí' : 'No'}</p>

        <button onClick={() => onToggle(videojuego.id, videojuego.terminado)}>
        Cambiar estado
        </button>
        <button
        onClick={() => onEliminar(videojuego.id)}
        style={{ marginLeft: '10px', backgroundColor: '#ff1900', color: 'white', border: 'none', padding: '3px 8px', borderRadius: '3px' }}>
        Borrar
        </button>
    </div>
    );
}