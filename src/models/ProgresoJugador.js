import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProgresoJugador = sequelize.define('ProgresoJugador', {
  id_progreso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_jugador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: 'jugadores', key: 'id_jugador' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  nivel: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  experiencia_actual: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  puntuacion_maxima: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  fecha_actualizacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { tableName: 'progreso_jugador' });

export default ProgresoJugador;
