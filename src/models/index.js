import Jugador from './Jugador.js';
import ProgresoJugador from './ProgresoJugador.js';
import MisionProgreso from './MisionProgreso.js';

Jugador.hasOne(ProgresoJugador, {
  foreignKey: 'id_jugador', sourceKey: 'id_jugador', as: 'progreso', onDelete: 'CASCADE', onUpdate: 'CASCADE'
});
ProgresoJugador.belongsTo(Jugador, { foreignKey: 'id_jugador', targetKey: 'id_jugador', as: 'jugador' });

Jugador.hasMany(MisionProgreso, {
  foreignKey: 'id_jugador', sourceKey: 'id_jugador', as: 'misiones', onDelete: 'CASCADE', onUpdate: 'CASCADE'
});
MisionProgreso.belongsTo(Jugador, { foreignKey: 'id_jugador', targetKey: 'id_jugador', as: 'jugador' });

export { Jugador, ProgresoJugador, MisionProgreso };
