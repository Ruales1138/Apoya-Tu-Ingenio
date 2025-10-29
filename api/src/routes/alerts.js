// src/routes/alerts.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { alertsSummary } = require("../controllers/alertController");

router.get("/summary", auth, alertsSummary);

module.exports = router;
