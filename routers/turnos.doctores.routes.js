const router = require("express").Router();

//Ir a la pantalla principal de los doctores
router.get("/doctor", (req, res) => {
  res.render("doctor/index", {rol: req.cookies.rol, user: req.cookies.name});
});

//Ir a la lista de los turnos
router.get("/doctor/turnos/dia", (req, res) => {
  res.render("doctor/lista_turnos", {idUser: req.cookies.id, user: req.cookies.name});
});

//Ir a la lista de los turnos
router.get("/doctor/turnos/completo", (req, res) => {
  res.render("doctor/lista_turnos_completo", {idUser: req.cookies.id, user: req.cookies.name});
});

//Ir a la lista de los turnos
router.get("/doctor/turno/atender/:id/:idDevolucion", (req, res) => {
  const {id, idDevolucion} = req.params;
  res.render("doctor/atender_paciente",{user: req.cookies.name, idTurno: id, idDevolucion});
});

// =====================================================
//         Rutas gestionar Doctores
// =====================================================

module.exports = router;
