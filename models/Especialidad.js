const { sequelize, DataTypes } = require("../conection/db");
const Doctor = require("./Doctor");

const Especialidad = sequelize.define(
  "Especialidad",
  {
    especialidad_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Esto desactivará los campos de timestamp automáticos
    tableName: "especialidades",
  }
);

//Realizo la relacion de uno a muchos de la tabla doctor a especialidad
Especialidad.hasMany(Doctor, { foreignKey: "especialidad_id", as: "doctores" });
Doctor.belongsTo(Especialidad, { foreignKey: "especialidad_id" });

// Crear tabla si no existe
Especialidad.sync();

module.exports = Especialidad;
