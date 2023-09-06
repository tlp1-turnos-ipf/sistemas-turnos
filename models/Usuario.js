const { sequelize, DataTypes } = require("../conection/db");
const Persona = require("./Persona");

const Usuario = sequelize.define(
  "Usuario",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: "El email ya existe",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      defaultValue: true,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "usuarios",
  }
);

//Realizo la relacion de uno a muchos de la tabla usuario a proyecto
Persona.hasMany(Usuario, { foreignKey: "persona_id", as: "usuarios" });
Usuario.belongsTo(Persona, { foreignKey: "persona_id" });

// Crear tabla si no existe
Usuario.sync();

module.exports = Usuario;
