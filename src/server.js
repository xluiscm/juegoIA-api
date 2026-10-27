import 'dotenv/config';
import app from './app.js';
import sequelize from './config/database.js';
import './models/index.js';

const port = Number(process.env.PORT) || 3000;

try {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => console.log(`JuegoIA API disponible en http://localhost:${port}`));
} catch (error) {
  console.error('No fue posible conectar con la base de datos:', error.message);
  process.exit(1);
}
