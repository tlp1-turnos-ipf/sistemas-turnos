const router = require("express").Router();

//Ir a la pantalla principal de los doctores
router.get("/doctor", (req, res) => {
  res.render("doctor/index", {rol: req.cookies.rol});
});

//Ir a la lista de los turnos
router.get("/doctor/turnos/dia", (req, res) => {
  res.render("doctor/lista_turnos", {idUser: req.cookies.id});
});

// =====================================================
//         Rutas gestionar Doctores
// =====================================================

module.exports = router;
