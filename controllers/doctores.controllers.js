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
        res.render("doctores/pantalla_principal", {
          results: results,
          login: true,
          usuario: id,
          nombres: req.session.nombres,
          apellidos: req.session.apellidos,
          fecha: fechaActual
        });
      }
    );
  } else{
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
      "SELECT * FROM `turnos` join personas ON turnos.paciente_id = personas.persona_id join sexos ON personas.sexo = sexos.sexo_id WHERE turnos_id = ? ",
      [turno_id],
      (error, results) => {
        res.render("doctores/atender_paciente", {
          results: results,
          login: true,
          id_turno: turno_id,
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

devolucion_turno_paciente = (req, res) =>{
  const {turno_id, titulo, descripcion } = req.body;
  
  if (req.session.loggedin) {
    conexion.query(
      "INSERT INTO devoluciones SET ?",
    {
      turnos_id: turno_id,
      titulo: titulo,
      descripcion: descripcion,
    },
      (error, results) => {
        res.render("doctores/atender_paciente", {
          alert: true,
          alertTitle: "Exitoso",
          alertMessage: "Se ha agregado la devolución del turno",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1800,
          ruta: "doctores_atender/:turno_id",
          login: true
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
}


module.exports = { pantalla_principal, atender_paciente, devolucion_turno_paciente };
