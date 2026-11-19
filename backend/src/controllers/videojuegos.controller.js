import prisma from '../lib/prisma.js';

export const obtenerVideojuegos = async (req, res) => {
    try {
        const videojuegos = await prisma.videojuego.findMany({
            include: { plataforma: true }
        });
        res.json(videojuegos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los videojuegos" });
    }
};

export const crearVideojuego = async (req, res) => {
    try {
        const { titulo, genero, terminado, plataformaId } = req.body;

        if (!titulo || !genero || !plataformaId) {
            return res.status(400).json({
                error: "El título, género y plataformaId son obligatorios"
            });
        }

        const nuevoVideojuego = await prisma.videojuego.create({
            data: {
                titulo,
                genero,
                terminado: terminado || false,
                plataformaId: parseInt(plataformaId)
            }
        });

        res.status(201).json(nuevoVideojuego);
    } catch (error) {
        res.status(500).json({ error: "Error interno al crear el videojuego" });
    }
};

export const editarVideojuego = async (req, res) => {
    try {
        const { id } = req.params;
        const juegoActualizado = await prisma.videojuego.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.json(juegoActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

export const eliminarVideojuego = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.videojuego.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};