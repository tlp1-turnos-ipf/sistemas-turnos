const DevolucionTurno = require("./DevolucionTurno");

const TipoDevolucion = sequelize.define(
  "Tipo_Devolucion",
  {
    descripcion_turno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

//Realizo la relacion de uno a muchos
Turno.hasMany(TipoDevolucion, { foreignKey: "turno_id", as: "devolucion_turno" });
TipoDevolucion.belongsTo(Turno, { foreignKey: "turno_id" });

module.exports = DevolucionTurno;
