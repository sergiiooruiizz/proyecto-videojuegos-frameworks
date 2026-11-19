import express from 'express';
import plataformasRoutes from './routes/plataformas.routes.js';
import videojuegosRoutes from './routes/videojuegos.routes.js';
import cors from "cors";

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        nombre: "API de Videojuegos y Plataformas",
        estado: "funcionando",
        version: "1.0.0"
    });
});

app.use('/api/plataformas', plataformasRoutes);
app.use('/api/videojuegos', videojuegosRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
    console.error(err);
    const isProd = process.env.NODE_ENV === "production";
    res.status(err.status || 500).json({
    error: isProd ? "Error interno del servidor" : err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});