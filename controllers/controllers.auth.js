const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../helpers/generar_jwt");
const authCtrl = {};

authCtrl.ctrlLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "El email no existe",
      });
    }

    // Verificar si el usuario está activo
    if (!user.estado) {
      return res.status(400).json({
        message: "El usuario no está activo",
      });
    }

    // Verificar la contraseña
    const passwordValido = await bcrypt.compare(password, user.password);

    if (!passwordValido) {
      return res.status(400).json({
        message: "La contraseña no es válida",
      });
    }

    // Generar el JWT
    const token = await generarJWT({ user: user.usuario_id });

    if (!token) {
      return res.status(400).json({
        message: "No tiene una sesion iniciada",
      });
    }

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al iniciar sesión",
    });
  }
};

// es un controlador que voy a usar para validar si el token es válido.
authCtrl.ctrlGetUserInfoByToken = async (req, res) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      console.log("No hay token");
      return null;
    }

    const { user: id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = (await Usuario.findByPk(id)) ?? null;

    console.log(user);

    if (!user) {
      return null;
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // El token ha expirado, puedes responder de acuerdo a tu lógica de manejo de tokens expirados
      return res.status(401).json({ message: "Token expirado" });
    }
  }
};

module.exports = authCtrl;
