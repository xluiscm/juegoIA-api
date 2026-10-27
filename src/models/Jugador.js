import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Jugador = sequelize.define('Jugadores', {
  id_jugador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  fecha_registro: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  estado_cuenta: { type: DataTypes.ENUM('activo', 'baneado', 'inactivo'), allowNull: false, defaultValue: 'activo' }
}, { tableName: 'jugadores' });

export default Jugador;
