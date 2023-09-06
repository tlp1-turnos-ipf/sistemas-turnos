const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const validarJWT = async (req, res, next) => {
  // Leer el token
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "No hay token en la petición",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    // Leer el usuario que corresponde al id
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(401).json({
        message: "Token no válido - usuario no existe en la base de datos",
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(401).json({
        message: "Token no válido - usuario con estado: false",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
