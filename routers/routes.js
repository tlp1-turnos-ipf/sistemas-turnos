const router = require("express").Router();

//Rutas principales
router.use(require("./index.routes"));
router.use(require("./auth.routes"));

//Rutas de Administradores
router.use(require("./rol.routes"));
router.use(require("./pacientes.routes"));
router.use(require("./admin.routes"));
router.use(require("./usuario.routes"));
router.use(require("./persona.routes"));
router.use(require("./doctores.routes"));
router.use(require("./horarios.routes"));
router.use(require("./turnos.routes"));
router.use(require("./especialidades.routes"));

//Rutas de doctores
router.use(require("./turnos.doctores.routes"));

//Rutas de doctores
router.use(require("./turnos.pacientes.routes"));

//Devolcion
router.use(require("./devolucion.routes"));

module.exports = router;
