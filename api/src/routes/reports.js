// src/routes/reports.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createReport, listReports } = require("../controllers/reportController");

router.post("/", auth, createReport);
router.get("/", auth, listReports);

module.exports = router;
