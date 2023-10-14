const router = require("express").Router();

//Pantalla principal de los administradores
router.get("/administrador", (req, res) => {
  res.render("administrador/index", {user: req.cookies.name});
});

module.exports = router;
