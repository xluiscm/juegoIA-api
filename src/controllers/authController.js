import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Jugador, ProgresoJugador } from '../models/index.js';

const datosPublicos = ({ id_jugador, username, email, fecha_registro, estado_cuenta }) => ({
  id_jugador, username, email, fecha_registro, estado_cuenta
});

const crearToken = (jugador) => jwt.sign(
  { id_jugador: jugador.id_jugador, username: jugador.username },
  process.env.JWT_SECRET,
  { expiresIn: '8h' }
);

export const registrar = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ mensaje: 'username, email y password son obligatorios.' });
    if (password.length < 8) return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres.' });

    const existente = await Jugador.findOne({ where: { email } });
    if (existente) return res.status(409).json({ mensaje: 'El correo ya está registrado.' });

    const jugador = await Jugador.create({ username, email, password_hash: await bcrypt.hash(password, 12) });
    await ProgresoJugador.create({ id_jugador: jugador.id_jugador });
    res.status(201).json({ jugador: datosPublicos(jugador), token: crearToken(jugador) });
  } catch (error) { next(error); }
};

export const iniciarSesion = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const jugador = await Jugador.findOne({ where: { email } });
    if (!jugador || !(await bcrypt.compare(password || '', jugador.password_hash))) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
    }
    if (jugador.estado_cuenta !== 'activo') return res.status(403).json({ mensaje: 'La cuenta no está activa.' });
    res.json({ jugador: datosPublicos(jugador), token: crearToken(jugador) });
  } catch (error) { next(error); }
};

export const miPerfil = async (req, res, next) => {
  try {
    const jugador = await Jugador.findByPk(req.usuario.id_jugador, {
      attributes: { exclude: ['password_hash'] }, include: ['progreso', 'misiones']
    });
    res.json(jugador);
  } catch (error) { next(error); }
};
