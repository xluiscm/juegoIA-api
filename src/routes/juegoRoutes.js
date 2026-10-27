import { Router } from 'express';
import { actualizarMision, actualizarProgreso, crearMision, eliminarMision, listarMisiones, obtenerProgreso } from '../controllers/juegoController.js';
import { autenticar } from '../middleware/auth.js';

const router = Router();
router.use(autenticar);
router.route('/progreso').get(obtenerProgreso).patch(actualizarProgreso);
router.route('/misiones').get(listarMisiones).post(crearMision);
router.route('/misiones/:idMision').patch(actualizarMision).delete(eliminarMision);

export default router;
