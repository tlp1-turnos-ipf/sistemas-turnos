const router = require("express").Router();

//Ir a la pantalla principal de los doctores
router.get("/paciente", (req, res) => {
  res.render("paciente/index", {user: req.cookies.name});
});

module.exports = router;
