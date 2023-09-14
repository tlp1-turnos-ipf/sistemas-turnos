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


module.exports = router;
