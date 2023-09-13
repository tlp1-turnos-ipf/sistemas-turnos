const router = require("express").Router();
const { validateSchema } = require('./../middlewares/validar_schema');
const { validateUser } = require('./../models/validation');
const { crearUsuarioPaciente, crearUsuarioDoctor, crearUsuarioAdmin } = require("../controllers/controllers.usuarios");

// Nuevo usuario
router.post("/api/usuario/paciente", validateUser, validateSchema, crearUsuarioPaciente);

router.post("/api/usuario/doctor", validateUser, validateSchema, crearUsuarioDoctor);

router.post("/api/usuario/admin", validateUser, validateSchema, crearUsuarioAdmin);

module.exports = router;