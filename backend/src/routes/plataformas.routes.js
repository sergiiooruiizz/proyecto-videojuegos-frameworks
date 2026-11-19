import { Router } from 'express';
import { obtenerPlataformas, crearPlataforma } from '../controllers/plataformas.controller.js';
import { comprobarApiKey } from '../middleware/apiKey.js';

const router = Router();

router.get('/', obtenerPlataformas);
router.post('/', comprobarApiKey, crearPlataforma);

export default router;