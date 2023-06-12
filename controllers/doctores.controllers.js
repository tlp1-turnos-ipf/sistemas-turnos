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
        req.session.results_pantalla_principal= results;
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

atender_paciente = (req, res) => {
  const turno_id = req.params.turnos_id;
  req.session.turno_id = turno_id;
  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `turnos` left join personas ON turnos.paciente_id = personas.persona_id left join sexos ON personas.sexo = sexos.sexo_id left join devoluciones ON turnos.turnos_id = devoluciones.id_turnos WHERE turnos_id = ? ",
      [turno_id],
      (error, results) => {
        res.render("doctores/atender_paciente", {
          results: results,
          login: true,
          id_turno: req.session.turno_id,
          nombres: results[0].nombres,
          apellidos: results[0].apellidos,
          dni: results[0].dni,
          fecha_nac: results[0].fecha_nac,
          descripcion_sexo: results[0].descripcion_sexo,
          telefono: results[0].telefono,
          situacion: results[0].situacion,
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
      login: false,
    });
  }
};

devolucion_turno_paciente = (req, res) => {
  const { turnos_id, titulo, descripcion } = req.body;

  if (req.session.loggedin) {
    conexion.query(
      "INSERT INTO devoluciones SET ?",
      {
        id_turnos: turnos_id,
        titulo: titulo,
        descripcion: descripcion,
      },
      (error, results) => {
        res.render(`doctores/pantalla_principal`, {
          login: true,
          results: req.session.results_pantalla_principal,
          alert: true,
          alertTitle: "Hecho",
          alertMessage: "Devolución finalizada",
          alertIcon: "success",
          ruta: `doctores_atender/${turnos_id}`,
          login: true,
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
      login: false,
    });
  }
};

module.exports = {
  pantalla_principal,
  atender_paciente,
  devolucion_turno_paciente,
};
