// src/controllers/alertController.js
const { Op } = require("sequelize");
const Assignment = require("../models/Assignment");
const MonitoringReport = require("../models/MonitoringReport");

async function alertsSummary(req, res) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    // find assignments with no reports in last 30 days
    const assignments = await Assignment.findAll();
    const reportCounts = await MonitoringReport.findAll({
      attributes: ["assignmentId", [MonitoringReport.sequelize.fn("COUNT", MonitoringReport.sequelize.col("id")), "cnt"]],
      where: { createdAt: { [Op.gte]: since } },
      group: ["assignmentId"],
    });
    const countMap = Object.fromEntries(reportCounts.map((r) => [r.assignmentId, Number(r.get("cnt"))]));

    const missingReports = assignments.filter((a) => (countMap[a.id] || 0) === 0).map((a) => a.id);

    // simplistic performance alert: any recent report with desempeño "bajo"
    const lowPerf = await MonitoringReport.findAll({ where: { createdAt: { [Op.gte]: since }, desempeño: "bajo" }, attributes: ["assignmentId"] });
    const lowPerfSet = new Set(lowPerf.map((r) => r.assignmentId));

    // hours control: sum horasReportadas vs horasAsignadas
    const hoursAgg = await MonitoringReport.findAll({
      attributes: ["assignmentId", [MonitoringReport.sequelize.fn("SUM", MonitoringReport.sequelize.col("horasReportadas")), "horas"]],
      group: ["assignmentId"],
    });
    const horasMap = Object.fromEntries(hoursAgg.map((r) => [r.assignmentId, Number(r.get("horas"))]));
    const exceededHours = assignments.filter((a) => (horasMap[a.id] || 0) > a.horasAsignadas).map((a) => a.id);

    return res.json({ ok: true, alerts: {
      missingReports, // assignments sin reportes recientes
      lowPerformance: Array.from(lowPerfSet),
      exceededHours,
    }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Error del servidor" });
  }
}

module.exports = { alertsSummary };
