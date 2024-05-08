// Se importan las clases de la librería
const { Sequelize, Model, DataTypes } = require("sequelize");

// Se crea una instancia de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME || "bd_centro_atencion",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost", //localhost
    dialect: process.env.DB_DIALECT || "mysql", // 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    port: process.env.DB_PORT || "3306",
  }
);

const conectarDB = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de Datos Conectada");
  } catch (error) {
    console.log("Error de la base : " + error);
  }
};

// Se exportan la conexión
module.exports = {
  sequelize,
  DataTypes,
  conectarDB,
};
