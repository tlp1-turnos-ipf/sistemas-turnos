const conexion = require("../conection/db");

//Var de session

exports.autentificacion = async (req, res) => {
  const nombre_usuario = req.body.nombre_usuario;
  const password = req.body.password;

  if (nombre_usuario && password) {
    conexion.query(
      "SELECT * FROM usuarios join personas ON usuarios.id_persona = personas.persona_id WHERE nombre_usuario = ? and contrasenia = ?",
      [nombre_usuario, password],
      async (error, results) => {
        if (results.length == 0) {
          res.render("inicio_sesion", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario o contraseña no correcta",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 1500,
            ruta: "inicio_sesion",
          });
        } else {
          req.session.loggedin = true;
          req.session.usuario = results[0].persona_id;
          req.session.rol = results[0].rol;
          req.session.nombres = results[0].nombres;
          req.session.apellidos = results[0].apellidos;
          req.session.dni = results[0].dni;

          if ((req.session.rol = 1)) {
            res.render("inicio_sesion/index", {
              alert: true,
              alertTitle: "Exitoso",
              alertMessage: "Ha ingresado al sistema",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1500,
              ruta: "doctores_pantalla_principal",
            });
          } else if ((req.session.rol = 2)) {
            res.render("inicio_sesion/index", {
              alert: true,
              alertTitle: "Exitoso",
              alertMessage: "Ha ingresado al sistema",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1500,
              ruta: "doctores_pantalla_principal",
            });
          } else if ((req.session.rol = 3)) {
            res.render("inicio_sesion/index", {
              alert: true,
              alertTitle: "Exitoso",
              alertMessage: "Ha ingresado al sistema",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1500,
              ruta: "",
            });
          }
        }
      }
    );
  }
};

exports.autentificacion_paciente = async (req, res) => {
  const nombre_usuario = req.body.nombre_usuario;
  const password = req.body.password;

  if (nombre_usuario && password) {
    conexion.query(
      "SELECT * FROM usuarios join personas ON usuarios.id_persona = personas.persona_id WHERE nombre_usuario = ? and contrasenia = ?",
      [nombre_usuario, password],
      async (error, results) => {
        if (results.length == 0) {
          res.render("inicio_sesion", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario o contraseña no correcta",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 1500,
            ruta: "inicio_sesion",
          });
        } else {
          req.session.loggedin = true;
          req.session.usuario = results[0].persona_id;
          req.session.rol = results[0].rol;
          req.session.nombres = results[0].nombres;
          req.session.apellidos = results[0].apellidos;
          req.session.dni = results[0].dni;

          res.render("inicio_sesion/index", {
            alert: true,
            alertTitle: "Exitoso",
            alertMessage: "Ha ingresado al sistema",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "paciente_pantalla_principal",
          });
        }
      }
    );
  }
};
