const { sequelize, DataTypes } = require("../conection/db");
const Turno = require("./Turno");

const DevolucionTurno = sequelize.define(
  "Devolucion_Turno",
  {
    titulo_turno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion_turno: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    turno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

//Realizo la relacion de uno a muchos
Turno.hasMany(DevolucionTurno, { foreignKey: "turno_id", as: "devolucion_turno" });
DevolucionTurno.belongsTo(Turno, { foreignKey: "turno_id" });

module.exports = DevolucionTurno;
