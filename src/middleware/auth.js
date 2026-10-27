import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ mensaje: 'Token de autenticación requerido.' });

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

export const soloPropietario = (req, res, next) => {
  if (Number(req.params.idJugador) !== req.usuario.id_jugador) {
    return res.status(403).json({ mensaje: 'No tienes permiso para acceder a este jugador.' });
  }
  next();
};
