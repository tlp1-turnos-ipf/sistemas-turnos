const { sequelize, DataTypes } = require("../conection/db");
const Usuario = require("./Usuario");

const Doctor = sequelize.define(
  "Doctor",
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    especialidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Esto desactivará los campos de timestamp automáticos
    tableName: "doctores",
  }
);

//Realizo la relacion de uno a muchos de la tabla usuario a doctor
Usuario.hasMany(Doctor, { foreignKey: "usuario_id", as: "doctores" });
Doctor.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Crear tabla si no existe
Doctor.sync();

module.exports = Doctor;
