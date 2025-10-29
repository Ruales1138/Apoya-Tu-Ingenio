// src/models/MonitoringReport.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const Assignment = require("./Assignment");
const User = require("./User");

const MonitoringReport = sequelize.define(
  "MonitoringReport",
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    horasReportadas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    desempeño: {
      type: DataTypes.ENUM("bueno", "regular", "bajo"),
      defaultValue: "bueno",
    },
  },
  { tableName: "monitoring_reports", timestamps: true }
);

MonitoringReport.belongsTo(Assignment, { as: "assignment", foreignKey: "assignmentId" });
Assignment.hasMany(MonitoringReport, { as: "reports", foreignKey: "assignmentId" });

MonitoringReport.belongsTo(User, { as: "autor", foreignKey: "autorId" });
User.hasMany(MonitoringReport, { as: "reportesCreados", foreignKey: "autorId" });

module.exports = MonitoringReport;
