// src/models/Application.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./User");
const Convocatoria = require("./Convocatoria");

const Application = sequelize.define(
  "Application",
  {
    perfilTexto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cvPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.ENUM("postulada", "preseleccionada", "seleccionada", "rechazada"),
      defaultValue: "postulada",
    },
  },
  { tableName: "applications", timestamps: true }
);

// Associations
Application.belongsTo(User, { as: "estudiante", foreignKey: "estudianteId" });
User.hasMany(Application, { as: "postulaciones", foreignKey: "estudianteId" });

Application.belongsTo(Convocatoria, { as: "convocatoria", foreignKey: "convocatoriaId" });
Convocatoria.hasMany(Application, { as: "applications", foreignKey: "convocatoriaId" });

module.exports = Application;
