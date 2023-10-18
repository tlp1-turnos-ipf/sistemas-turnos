const router = require("express").Router();

//Ir a la pantalla principal de los pacientes
router.get("/paciente", (req, res) => {
  res.render("paciente/index", { user: req.cookies.name });
});

//Ir a la pantalla turnos del dia de los pacientes
router.get("/paciente/turnos/dia", (req, res) => {
  res.render("paciente/turnos_dia", {
    user: req.cookies.name,
    idUser: req.cookies.id,
  });
});

//Ir a la pantalla de turnos completo de los pacientes
router.get("/paciente/turnos/completo", (req, res) => {
  res.render("paciente/turnos_completo", {
    user: req.cookies.name,
    idUser: req.cookies.id,
  });
});

//Ir a la pantalla de historial de devoluciones
router.get("/paciente/historial", (req, res) => {
  res.render("paciente/historial_devoluciones", {
    user: req.cookies.name,
    idUser: req.cookies.id,
  });
});
//Ir a la pantalla de historial de devoluciones
router.get("/paciente/devolucion/:id", (req, res) => {
  const { id } = req.params;
  res.render("paciente/ver_devolucion", {
    user: req.cookies.name,
    idTurno: id,
  });
});

module.exports = router;
