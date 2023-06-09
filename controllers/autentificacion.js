const conexion = require("../conection/db");

exports.autentificacion = (req, res) => {
  const nombre_usuario = req.body.nombre_usuario;
  const password = req.body.password;

  if (nombre_usuario && password) {
    conexion.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ? and contrasenia = ?",
      [nombre_usuario, password],
      (error, results) => {
        if (results.length == 0) {
          res.send("Datos Incorrectos");
        } else {
          res.render("doctores/pantalla_principal");
        }
      }
    )
  } else {
    res.send("Complete sus datos");
  }
};
