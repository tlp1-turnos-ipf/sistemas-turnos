const { sequelize, DataTypes } = require("../conection/db");
const Paciente = require("./Paciente");
const DoctorFecha = require("./DoctorFecha");

const Turno = sequelize.define(
  "Turno",
  {
    turno_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_fecha_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_turno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    timestamps: true,
    tableName: "turnos",
  }
);

//Realizo la relacion de uno a muchos de la tabla doctor a turno
Paciente.hasMany(Turno, { foreignKey: "paciente_id", as: "turnos_pacientes" });
Turno.belongsTo(Paciente, { foreignKey: "paciente_id" });

//Realizo la relacion de uno a muchos de la tabla doctor a turno
DoctorFecha.hasMany(Turno, { foreignKey: "doctor_fecha_id" });
Turno.belongsTo(DoctorFecha, { foreignKey: "doctor_fecha_id" });

// Crear tabla si no existe
Turno.sync();

module.exports = Turno;
