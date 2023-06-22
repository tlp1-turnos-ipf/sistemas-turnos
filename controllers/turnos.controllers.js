const conexion = require("../conection/db");

buscar_especialidades = (req, res) => {
  if (req.session.loggedin) {
    conexion.query("SELECT * FROM `especialidades`  ", (error, results) => {
      results = results;
      res.render("pacientes/solicitar_turno", {
        results: results,
        login: true,
      });
    });
  }
};
buscar_doctores = (req, res) => {
  const especialidad_id = req.params.especialidad_id;
  if (req.session.loggedin) {
    conexion.query("SELECT * FROM `especialidades` JOIN doctores ON especialidades.especialidad_id = doctores.id_especialidad JOIN personas ON doctores.id_persona = personas.persona_id WHERE especialidad_id = ? ",
    [especialidad_id],
    (error, results) => {
      results = results;
      res.render("pacientes/seleccionar_doctor", {
        results: results,
        login: true,
      });
    });
  }
};

buscar_fechas = (req, res) => {
  const doctor_id = req.params.doctor_id;
  if (req.session.loggedin) {
    conexion.query("SELECT * FROM `doctores` JOIN fecha_doctores ON doctores.doctor_id = fecha_doctores.id_doctor WHERE doctor_id = ? ",
    [doctor_id],
    (error, results) => {
      res.render("pacientes/seleccionar_fecha", {
        results: results,
        login: true,

      });
    });
  }
};

buscar_horario = (req, res) => {
  const fecha_turno_id = req.params.fecha_turno_id;
  if (req.session.loggedin) {
    conexion.query("SELECT * FROM `fecha_doctores` JOIN fecha_doctores_horarios ON fecha_doctores.fecha_doctores_id = fecha_doctores_horarios.id_fecha_doctores WHERE fecha_doctores_id = ? ",
    [fecha_turno_id],
    (error, results) => {
      res.render("pacientes/seleccionar_horario", {
        results: results,
        login: true,

      });
    });
  }
};


crear_turno = (req, res) => {
  const doctor_fecha_horario_id = req.params.doctor_fecha_horario_id;
  if (req.session.loggedin) {
    conexion.query("SELECT * FROM `fecha_doctores_horarios` JOIN fecha_doctores ON fecha_doctores_horarios.id_fecha_doctores = fecha_doctores.fecha_doctores_id WHERE fecha_doctores_horarios_id = ?",
    [doctor_fecha_horario_id],
    (error, results) => {
      res.render("pacientes/crear_turno", {
        results: results,
        login: true,
        paciente: req.session.usuario,
        doctor: results[0].id_doctor,
        fecha_turno: results[0]. fecha_turno,
        horario: results[0].horario,
      });
    });
  }
};




module.exports = { buscar_especialidades, buscar_doctores, buscar_fechas, buscar_horario, crear_turno };
