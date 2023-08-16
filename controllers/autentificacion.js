const conexion = require("../conection/db");

//Var de session

exports.autentificacion = async (req, res) => {
  const nombre_usuario = req.body.nombre_usuario;
  const password = req.body.password;

  if (nombre_usuario && password) {
    conexion.query(
      "SELECT * FROM usuarios join personas ON usuarios.id_persona = personas.persona_id LEFT join pacientes ON personas.persona_id = pacientes.id_persona WHERE nombre_usuario = ? and contrasenia = ?",
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
          req.session.usuario = results[0].paciente_id;
          req.session.nombres = results[0].nombres;
          req.session.apellidos = results[0].apellidos;
          const rol = results[0].rol;

          console.log(results);

          switch (rol) {
            case 1:
              res.render("inicio_sesion", {
                alert: true,
                alertTitle: "Paciente",
                alertMessage: "Ha ingresado al sistema",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: "paciente_pantalla_principal",
              });
              break;
            case 2:
              res.render("inicio_sesion", {
                alert: true,
                alertTitle: "Doctor",
                alertMessage: "Ha ingresado al sistema",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: "doctores_pantalla_principal",
              });
              break;
            case 3:
              res.render("administrador/index", {
                alert: true,
                alertTitle: "Administrador",
                alertMessage: "Ha ingresado al sistema",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: "administrador_pantalla_principal",
              });
              break;
            default:
              break;
          }

          console.log(rol);
        }
      }
    );
  }
};
