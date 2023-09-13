const router = require("express").Router();
const { validateSchema } = require('./../middlewares/validar_schema');
const { validatePerson } = require('./../models/validation')
const { crearPersona } = require("../controllers/controllers.persona");

// =====================================================
//         Registrar Personas
// =====================================================

// Nueva Persona
router.post("/api/persona/registro", validatePerson, validateSchema, crearPersona);

module.exports = router;
