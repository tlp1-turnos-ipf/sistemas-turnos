const { sequelize, DataTypes } = require("../conection/db");
const Usuario = require("./Usuario");

const Rol = sequelize.define(
  "Rol",
  {
    descripcion_rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "roles",
  }
);

//Realizo la relacion de uno a muchos
Rol.hasMany(Usuario, { foreignKey: "rol" });
Usuario.belongsTo(Rol, { foreignKey: "rol" });

module.exports = Rol;
