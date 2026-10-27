import { MisionProgreso, ProgresoJugador } from '../models/index.js';

export const obtenerProgreso = async (req, res, next) => {
  try {
    const progreso = await ProgresoJugador.findOne({ where: { id_jugador: req.usuario.id_jugador } });
    res.json(progreso);
  } catch (error) { next(error); }
};

export const actualizarProgreso = async (req, res, next) => {
  try {
    const campos = ['nivel', 'experiencia_actual', 'puntuacion_maxima'];
    const cambios = Object.fromEntries(campos.filter((campo) => req.body[campo] !== undefined).map((campo) => [campo, req.body[campo]]));
    if (!Object.keys(cambios).length) return res.status(400).json({ mensaje: 'Indica al menos un dato de progreso.' });
    cambios.fecha_actualizacion = new Date();
    const progreso = await ProgresoJugador.findOne({ where: { id_jugador: req.usuario.id_jugador } });
    await progreso.update(cambios);
    res.json(progreso);
  } catch (error) { next(error); }
};

export const listarMisiones = async (req, res, next) => {
  try { res.json(await MisionProgreso.findAll({ where: { id_jugador: req.usuario.id_jugador } })); } catch (error) { next(error); }
};

export const crearMision = async (req, res, next) => {
  try {
    const { nombre_mision } = req.body;
    if (!nombre_mision) return res.status(400).json({ mensaje: 'nombre_mision es obligatorio.' });
    const mision = await MisionProgreso.create({ id_jugador: req.usuario.id_jugador, nombre_mision });
    res.status(201).json(mision);
  } catch (error) { next(error); }
};

export const actualizarMision = async (req, res, next) => {
  try {
    const mision = await MisionProgreso.findOne({ where: { id_mision_progreso: req.params.idMision, id_jugador: req.usuario.id_jugador } });
    if (!mision) return res.status(404).json({ mensaje: 'Misión no encontrada.' });
    const { nombre_mision, completada } = req.body;
    const cambios = {};
    if (nombre_mision !== undefined) cambios.nombre_mision = nombre_mision;
    if (completada !== undefined) {
      cambios.completada = completada;
      cambios.fecha_completado = completada ? new Date() : null;
    }
    await mision.update(cambios);
    res.json(mision);
  } catch (error) { next(error); }
};

export const eliminarMision = async (req, res, next) => {
  try {
    const eliminadas = await MisionProgreso.destroy({ where: { id_mision_progreso: req.params.idMision, id_jugador: req.usuario.id_jugador } });
    if (!eliminadas) return res.status(404).json({ mensaje: 'Misión no encontrada.' });
    res.status(204).send();
  } catch (error) { next(error); }
};
