const { obtenerTurnosDelDia } = require("../controllers/controllers.turnos");

const router = require("express").Router();

//Ir a la pantalla principal de los doctores
router.get("/doctor", (req, res) => {
  res.render("doctor/index", {rol: req.cookies.rol});
});

//Ir a la lista de los turnos
router.get("/doctor/turnos/dia", (req, res) => {
  res.render("doctor/lista_turnos", {id: req.cookies.id});
});

// =====================================================
//         Rutas gestionar Doctores
// =====================================================
router.get("/api/lista_turnos/doctor/dia",  obtenerTurnosDelDia)

module.exports = router;
