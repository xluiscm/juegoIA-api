import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MisionProgreso = sequelize.define('MisionesProgreso', {
  id_mision_progreso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_jugador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'jugadores', key: 'id_jugador' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  nombre_mision: { type: DataTypes.STRING(100), allowNull: false },
  completada: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  fecha_completado: { type: DataTypes.DATE, allowNull: true, defaultValue: null }
}, { tableName: 'misiones_progreso' });

export default MisionProgreso;
