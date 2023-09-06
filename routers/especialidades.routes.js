const router = require("express").Router();

const {
  obtenerEspecialidades,
  crearEspecialidad
} = require("../controllers/controllers.especialidades");

//Ir a la pantalla de los especialidades activos
router.get("/lista_especialidades", (req, res) => {
  res.render("administrador/especialidad/lista_especialidades");
});

//Ir a la pantalla de los especialidades activos
router.get("/crear_especialidad", (req, res) => {
  res.render("administrador/especialidad/crear_especialidad");
});

// =====================================================
//         Rutas gestionar especialiadad
// =====================================================

//Obtener todas las especialidades
router.get("/api/especialidad", obtenerEspecialidades);

//Crear todas las especialidades
router.post("/api/especialidad", crearEspecialidad);

module.exports = router;
