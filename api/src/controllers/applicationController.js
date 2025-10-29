// src/controllers/applicationController.js
const Application = require("../models/Application");
const Convocatoria = require("../models/Convocatoria");
const { Op } = require("sequelize");

// naive AI-like scoring: count keyword matches between perfilTexto and convocatoria requisitos/habilidades
function scoreProfile(perfil, requisitos = [], habilidades = []) {
  if (!perfil) return 0;
  const text = perfil.toLowerCase();
  const tokens = [...requisitos, ...habilidades]
    .filter(Boolean)
    .map((t) => String(t).toLowerCase());
  if (tokens.length === 0) return 0;
  const matches = tokens.reduce((acc, t) => acc + (text.includes(t) ? 1 : 0), 0);
  return Math.round((matches / tokens.length) * 100);
}

async function applyToConvocatoria(req, res) {
  try {
    const { convocatoriaId, perfilTexto } = req.body;

    const convocatoria = await Convocatoria.findByPk(convocatoriaId);
    if (!convocatoria || convocatoria.estado !== "publicada") {
      return res.status(404).json({ ok: false, message: "Convocatoria no disponible" });
    }

    // prevent duplicate application by same student
    const existing = await Application.findOne({ where: { estudianteId: req.user.id, convocatoriaId } });
    if (existing) return res.status(409).json({ ok: false, message: "Ya aplicaste a esta convocatoria" });

    const cvPath = req.file ? `/uploads/${req.file.filename}` : null;
    const score = scoreProfile(perfilTexto, convocatoria.requisitos, convocatoria.habilidadesRequeridas);

    const application = await Application.create({
      estudianteId: req.user.id,
      convocatoriaId,
      perfilTexto,
      cvPath,
      score,
      estado: "postulada",
    });

    return res.status(201).json({ ok: true, application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Error del servidor" });
  }
}

async function listApplications(req, res) {
  try {
    const { convocatoriaId, estado } = req.query;
    const where = {};
    if (convocatoriaId) where.convocatoriaId = convocatoriaId;
    if (estado) where.estado = estado;

    // docentes ven todas de su convocatoria; estudiantes sólo las propias
    if (req.user.role !== "Docente") {
      where.estudianteId = req.user.id;
    }

    const apps = await Application.findAll({
      where,
      include: [
        { association: "convocatoria" },
        { association: "estudiante", attributes: ["id", "username", "role"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json({ ok: true, applications: apps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Error del servidor" });
  }
}

async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body; // preseleccionada, seleccionada, rechazada

    const app = await Application.findByPk(id, { include: [{ association: "convocatoria" }] });
    if (!app) return res.status(404).json({ ok: false, message: "Postulación no encontrada" });

    // only docente owner of convocatoria can change status
    if (req.user.role !== "Docente" || app.convocatoria.docenteId !== req.user.id) {
      return res.status(403).json({ ok: false, message: "No autorizado" });
    }

    app.estado = estado;
    await app.save();
    return res.json({ ok: true, application: app });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Error del servidor" });
  }
}

module.exports = { applyToConvocatoria, listApplications, updateApplicationStatus };
