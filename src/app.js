import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import juegoRoutes from './routes/juegoRoutes.js';
import swaggerDocument from './config/swagger.js';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (_req, res) => res.json({
  mensaje: 'JuegoIA API en funcionamiento.',
  documentacion: '/api-docs',
  salud: '/health',
  api: '/api/v1'
}));
app.get('/health', (_req, res) => res.json({ estado: 'ok' }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/juego', juegoRoutes);
app.use((_req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada.' }));
app.use((error, _req, res, _next) => {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ mensaje: error.errors.map((item) => item.message) });
  }
  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor.' });
});

export default app;
