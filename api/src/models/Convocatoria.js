// src/models/Convocatoria.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./User");

const Convocatoria = sequelize.define(
  "Convocatoria",
  {
    // Título de la convocatoria
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Descripción detallada
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Materia asociada
    materia: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Habilidades requeridas como array de strings
    habilidadesRequeridas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },

    // Número de puestos disponibles
    numeroPuestos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    // Requisitos como array de strings
    requisitos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },

    // Beneficios como array de strings
    beneficios: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },

    // Fecha de cierre de la convocatoria
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // Estado de la convocatoria
    estado: {
      type: DataTypes.ENUM("publicada", "cerrada"),
      defaultValue: "publicada",
    },
  },
  {
    tableName: "convocatorias",
    timestamps: true,
  }
);

// Relación: una convocatoria pertenece a un docente
Convocatoria.belongsTo(User, { foreignKey: "docenteId", as: "docente" });
User.hasMany(Convocatoria, { foreignKey: "docenteId", as: "convocatorias" });

module.exports = Convocatoria;