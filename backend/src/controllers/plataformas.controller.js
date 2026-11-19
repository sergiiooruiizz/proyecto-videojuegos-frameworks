import prisma from '../lib/prisma.js';

export const obtenerPlataformas = async (req, res) => {
    try {
        const plataformas = await prisma.plataforma.findMany();
        res.json(plataformas);
    } catch (error) {
        res.status(500).json({error: "Error al obtener las plataformas"});
    }
};

export const crearPlataforma = async (req, res) => {
    try {
        const { nombre, fabricante, lanzamiento } = req.body;

        if (!nombre || !fabricante) {
            return res.status(400).json({
                error: "El nombre y el fabricante son obligatorios"
            });
        }

        const nuevaPlataforma = await prisma.plataforma.create({
            data: {
                nombre,
                fabricante,
                lanzamiento: lanzamiento ? parseInt(lanzamiento) : null
            }
        });

        res.status(201).json(nuevaPlataforma);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({error: "Ya existe una plataforma con ese nombre"});
        }
        res.status(500).json({error: "Error del servidor"});
    }
};