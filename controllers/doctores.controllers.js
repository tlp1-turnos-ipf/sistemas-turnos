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


listar_turnos_completos = (req, res) => {
  const id = req.session.usuario;
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  const hoy = fecha.getDate();
  const mesActual = fecha.getMonth() + 1;

  const fechaActual = añoActual + "-" + mesActual + "-" + hoy;

  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `turnos` join personas ON turnos.paciente_id = personas.persona_id WHERE doctor_id = ?",
      [id],
      (error, results) => {
        res.render("doctores/lista_turnos_completo", {
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
  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `turnos` left join personas ON turnos.paciente_id = personas.persona_id left join sexos ON personas.sexo = sexos.sexo_id left join devoluciones ON turnos.turnos_id = devoluciones.id_turnos WHERE turnos_id = ? ",
      [turno_id],
      (error, results) => {
        res.render("doctores/atender_paciente", {
          results: results,
          login: true,
          id_turno: turno_id,
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

editar_devolucion_doctor = (req, res) => {
  const devolucion_id = req.params.devolucion_id;

  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM devoluciones WHERE devolucion_id = ? ",
      [devolucion_id],
      (error, results) => {
        res.render("doctores/editar_devolucion_turno", {
          results: results[0],
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

eliminar_devolucion_doctor = (req, res) => {
  const devolucion_id = req.params.devolucion_id;

  if (req.session.loggedin) {
    conexion.query(
      "DELETE FROM devoluciones WHERE devolucion_id = ? ",
      [devolucion_id],
      (error, results) => {
        res.render(`doctores/pantalla_principal`, {
          login: true,
          results: req.session.results_pantalla_principal,
          alert: true,
          alertTitle: "Eliminado",
          alertMessage: "Devolución Eliminada",
          alertIcon: "success",
          ruta: `doctores_atender/${req.session.turnos_id}`,
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

modificar_devolucion_turno = (req, res) => {};

module.exports = {
  pantalla_principal,
  atender_paciente,
  devolucion_turno_paciente,
  editar_devolucion_doctor,
  modificar_devolucion_turno,
  eliminar_devolucion_doctor,
  listar_turnos_completos
};
