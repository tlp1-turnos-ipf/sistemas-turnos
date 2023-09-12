const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const getUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(404).json({message:"No se ha iniciado sesión"});
  }
  const { user: id } = jwt.verify(token, process.env.SECRET_KEY);

  const user = await Usuario.findByPk(id);

  if (!user) {
    return res.sendStatus(403).json({message:"No existe un usuario con ese token"});
  }

  req.user = user;
  next();
};

module.exports = {getUser};
