const conexion = require("../conection/db");

pantalla_principal = (req, res) => {
    const id = req.session.usuario;
  
    if (req.session.loggedin) {
      conexion.query(
        "SELECT * personas where persona_id = ? ",
        [id],
        (error, results) => {
          res.render("administradores/pantalla_principal", {
            results: results,
            login: true,
            usuario: id,
            nombres: req.session.nombres,
            apellidos: req.session.apellidos,

          });
        }
      );
    } else {
      res.render("inicio_sesion/index", {
        alert: true,
        alertTitle: "Fallo",
        alertMessage: "No ha iniciado sesión",
        alertIcon: "error",
        showConfirmButton: false,
        timer: 1500,
        ruta: "inicio_sesion",
      });
    }
  };

  module.exports = {pantalla_principal}