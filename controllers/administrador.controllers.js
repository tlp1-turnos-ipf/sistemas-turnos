const conexion = require("../conection/db");

pantalla_principal = (req, res) => {
    const id = req.session.usuario;
    const fecha = new Date();
    const añoActual = fecha.getFullYear();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
  
    const fechaActual = añoActual + "-" + mesActual + "-" + hoy;
  
    if (req.session.loggedin) {
      conexion.query(
        "SELECT * FROM `turnos` join personas ON turnos.paciente_id = personas.persona_id WHERE doctor_id = ? and fecha_turno = ? ",
        [id, fechaActual],
        (error, results) => {
          req.session.results_pantalla_principal = results;
          res.render("doctores/pantalla_principal", {
            results: results,
            login: true,
            usuario: id,
            nombres: req.session.nombres,
            apellidos: req.session.apellidos,
            fecha: fechaActual,
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