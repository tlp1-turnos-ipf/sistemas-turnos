const isRol = (req, res) => {
  if (req.user.rol === 1) {
    return res.status(200).json({ roles: "/administrador" });
  } 
  else if (req.user.rol === 2) {
    return res.status(200).json({ roles: "/usuario_sistema" });
  }
  else if (req.user.rol === 3) {
    return res.status(200).json({ roles: "/paciente" });
  }
  else if (req.user.rol === 4) {
    return res.status(200).json({ roles: "/doctor" });
  }
};

module.exports = { isRol };
