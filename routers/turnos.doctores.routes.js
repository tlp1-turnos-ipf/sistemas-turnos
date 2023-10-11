const { obtenerTurnosDelDia } = require("../controllers/controllers.turnos");

const router = require("express").Router();

//Ir a la pantalla principal de los doctores
router.get("/doctor", (req, res) => {
  res.render("doctor/index");
});

//Ir a la lista de los turnos
router.get("/doctor/turnos", (req, res) => {
  res.render("doctor/lista_turnos");
});

// =====================================================
//         Rutas gestionar Doctores
// =====================================================
router.get("/lista_turnos/doctor/dia", obtenerTurnosDelDia)

module.exports = router;
