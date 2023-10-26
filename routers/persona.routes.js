const router = require("express").Router();

const { crearPersona } = require("../controllers/controllers.persona");

// ===================================================== 
//         Registrar Personas
// =====================================================

// Nueva Persona
router.post("/api/persona/registro", crearPersona);

module.exports = router;
