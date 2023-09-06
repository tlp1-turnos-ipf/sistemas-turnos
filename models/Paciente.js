const { sequelize, DataTypes } = require("../conection/db");
const Usuario = require("./Usuario");

const Paciente = sequelize.define(
  "Paciente",
  {
    paciente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_discapacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "pacientes",
  }
);

//Realizo la relacion de uno a muchos de la tabla usuario a proyecto
Usuario.hasMany(Paciente, { foreignKey: "usuario_id", as: "pacientes" });
Paciente.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Crear tabla si no existe
Paciente.sync();

module.exports = Paciente;
