import { Router } from 'express';
import { iniciarSesion, miPerfil, registrar } from '../controllers/authController.js';
import { autenticar } from '../middleware/auth.js';

const router = Router();
router.post('/registro', registrar);
router.post('/login', iniciarSesion);
router.get('/perfil', autenticar, miPerfil);

export default router;
