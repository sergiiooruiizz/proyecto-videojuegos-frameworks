import { VideojuegoItem } from './VideojuegoItem';

export function ListaVideojuegos({ videojuegos, onEliminar, onToggle }) {
    if (videojuegos.length === 0) {
    return <p>No hay videojuegos guardados.</p>;
    }

    return (
    <div>
        {videojuegos.map((juego) => (
        <VideojuegoItem
            key={juego.id}
            videojuego={juego}
            onEliminar={onEliminar}
            onToggle={onToggle}
        />
        ))}
    </div>
    );
}