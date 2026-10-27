# JuegoIA API

API REST con Express, Sequelize/MySQL, JWT y Swagger para gestionar jugadores, progreso y misiones.

## Ejecutar

1. Copia `.env.example` como `.env` y configura tus credenciales (MySQL usa el puerto `40343`).
2. Instala, crea la base de datos y ejecuta:
   ```bash
   npm install
   npm run db:create
   npm run dev
   ```
3. Abre la documentación interactiva: `http://localhost:3000/api-docs`.

El registro crea automáticamente un registro de progreso para el jugador. Las relaciones de progreso y misiones usan `ON DELETE CASCADE`.
