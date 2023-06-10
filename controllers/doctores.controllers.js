const conexion = require("../conection/db");

pantalla_principal = (req, res) => {
  const id = req.session.usuario;
  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `turnos` join personas ON turnos.paciente_id = personas.persona_id WHERE doctor_id = ? ",
      [id],
      (error, results) => {
        res.render("doctores/pantalla_principal", {
          results: results,
          login: true,
          usuario: id,
          nombres: req.session.nombres,
          apellidos: req.session.apellidos
        });
      }
    );
  } else {
    res.render("inicio_sesion/index", {
      login: false,
      usuario: "Debe Iniciar Sesion",
    });
  }
};

pacientes_dia = (req, res) => {
  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `personas` join usuarios ON personas.persona_id = usuarios.id_persona WHERE persona_id = ?",
      [id],
      (error, results) => {
        res.render("doctores/pantalla_principal", {
          results: results,
          login: true,
          usuario: id,
        });
      }
    );
  } else {
    res.render("inicio_sesion/index", {
      login: false,
      usuario: "Debe Iniciar Sesion",
    });
  }
};

module.exports = { pantalla_principal, pacientes_dia };
