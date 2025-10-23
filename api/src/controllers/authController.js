const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'cambiame_por_una_secreta';

async function register(req, res) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, message: 'Usuario y contraseña requeridos' });

    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(409).json({ ok: false, message: 'Usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, passwordHash, role: role || 'Estudiante' });
    return res.status(201).json({ ok: true, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
}

async function login(req, res) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ ok: false, message: 'Usuario y contraseña requeridos' });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });

    if (role && role !== user.role) return res.status(403).json({ ok: false, message: 'Rol inválido para este usuario' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' });

    return res.json({ ok: true, user: { id: user.id, username: user.username, role: user.role }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
}

module.exports = { register, login };