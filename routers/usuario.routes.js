const router = require("express").Router();

const { crearUsuario} = require("../controllers/controllers.usuarios");

// Nuevo usuario
router.post("/api/usuario", crearUsuario);

module.exports = router;