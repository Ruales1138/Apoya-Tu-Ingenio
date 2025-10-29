// src/routes/applications.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { applyToConvocatoria, listApplications, updateApplicationStatus } = require("../controllers/applicationController");
const multer = require("multer");
const path = require("path");

// file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), "uploads")),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// apply with optional CV upload
router.post("/", auth, upload.single("cv"), applyToConvocatoria);

// list apps (docente sees all for their convocatorias; student sees own)
router.get("/", auth, listApplications);

// update status (docente owner only)
router.patch("/:id/status", auth, updateApplicationStatus);

module.exports = router;
