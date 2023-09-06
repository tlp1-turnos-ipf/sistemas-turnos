const router = require("express").Router();

const { crearUsuarioPaciente, crearUsuarioDoctor, crearUsuarioAdmin } = require("../controllers/controllers.usuarios");

// Nuevo usuario
router.post("/api/usuario/paciente", crearUsuarioPaciente);

router.post("/api/usuario/doctor", crearUsuarioDoctor);

router.post("/api/usuario/admin", crearUsuarioAdmin);

module.exports = router;
