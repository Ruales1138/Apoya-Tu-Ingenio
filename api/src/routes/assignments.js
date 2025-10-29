// src/routes/assignments.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createAssignment, listAssignments } = require("../controllers/assignmentController");

router.post("/", auth, createAssignment); // docente owner will be validated in controller
router.get("/", auth, listAssignments);

module.exports = router;
