const router = require("express").Router();

//Pantalla principal de los administradores
router.get("/administrador", (req, res) => {
  res.render("administrador/index");
});

module.exports = router;
