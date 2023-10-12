const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { promisify } = require("util");
require("dotenv").config()


const getUser = async (req, res, next) => {
  const token = req.cookies.id;
  console.log("Esto es el token", token);

  // Usar return para salir del middleware
  if (!token) {
    return res.status(401).json({ message: "No se ha iniciado sesión" });
  }

  try {
    const user = await Usuario.findOne({ where: { usuario_id: token } });
    console.log("Este es el user", user);

    if (!user) {
      return res
        .status(403)
        .json({ message: "No existe un usuario con ese token" }); // Usar return para salir del middleware
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" }); // Usar return para salir del middleware
  }
};

module.exports = { getUser };
