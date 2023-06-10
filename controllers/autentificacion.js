const conexion = require("../conection/db");

//Var de session

exports.autentificacion = async (req, res) => {
  const nombre_usuario = req.body.nombre_usuario;
  const password = req.body.password;

  if (nombre_usuario && password) {
    conexion.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ? and contrasenia = ?",
      [nombre_usuario, password],
      async (error, results) => {
        if (results.length == 0) {
          res.render("inicio_sesion/index", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario o contraseña no correcta",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 1500,
            ruta: "inicio_sesion/index",
          });
        } else {
          req.session.loggedin = true;
          req.session.usuario = results[0].usuario_id;
          res.render("inicio_sesion/index", {
            alert: true,
            alertTitle: "Exitoso",
            alertMessage: "Ha ingresado al sistema",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "doctores_pantalla_principal",
          });
        }
       
      }
    );
  } else {
    res.send("Complete sus datos");
  }
};
