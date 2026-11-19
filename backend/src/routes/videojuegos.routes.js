import { Router } from 'express';
import { obtenerVideojuegos, crearVideojuego, editarVideojuego, eliminarVideojuego } from '../controllers/videojuegos.controller.js';
import { comprobarApiKey } from '../middleware/apiKey.js';

const router = Router();

router.get('/', obtenerVideojuegos);
router.post('/', comprobarApiKey, crearVideojuego);
router.patch('/:id', comprobarApiKey, editarVideojuego);
router.delete('/:id', comprobarApiKey, eliminarVideojuego);

export default router;