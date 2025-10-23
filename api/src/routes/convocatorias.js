// src/routes/convocatorias.js
const express = require("express");
const router = express.Router();
const {
  crearConvocatoria,
  listarConvocatorias,
  cerrarConvocatoria,
} = require("../controllers/convocatoriaController");
const auth = require("../middleware/auth");
const requireDocente = require("../middleware/requireDocente");

// Crear convocatoria (solo docentes)
router.post("/", auth, requireDocente, crearConvocatoria);

// Listar convocatorias (público)
router.get("/", listarConvocatorias);

// Cerrar convocatoria (solo docente creador)
router.patch("/:id/cerrar", auth, cerrarConvocatoria);

module.exports = router;