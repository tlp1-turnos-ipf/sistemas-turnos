const router = require("express").Router();
const { validatePerson } = require("../models/schema/validation")
const { validateSchema } = require("../middlewares/validar_schema")
const { crearPersona } = require("../controllers/controllers.persona");

// =====================================================
//         Registrar Personas
// =====================================================

// Nueva Persona
router.post("/api/persona/registro", validatePerson, validateSchema, crearPersona);

module.exports = router;
