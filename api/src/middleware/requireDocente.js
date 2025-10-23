// src/middleware/requireDocente.js
function requireDocente(req, res, next) {
  if (req.user.role !== "Docente") {
    return res.status(403).json({ ok: false, message: "Acceso permitido solo a docentes" });
  }
  next();
}

module.exports = requireDocente;