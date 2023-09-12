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
    imagen_firma: {
      type: DataTypes.BLOB,
      allowNull: true
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
    timestamps: true,
    tableName: "doctores",
  }
);

//Realizo la relacion de uno a muchos de la tabla usuario a doctor
Usuario.hasMany(Doctor, { foreignKey: "usuario_id", as: "doctores" });
Doctor.belongsTo(Usuario, { foreignKey: "usuario_id" });



module.exports = Doctor;
