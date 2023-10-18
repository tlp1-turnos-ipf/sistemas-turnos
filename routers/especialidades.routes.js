const router = require("express").Router();
const { validateSchema } = require('./../middlewares/validar_schema');
const { validateSpecialty } = require('./../models/validation');
const {
  obtenerEspecialidades,
  obtenerEspecialidadPorId,
  crearEspecialidad,
  updateEspecialidad
} = require("../controllers/controllers.especialidades");

//Ir a la pantalla de los especialidades activos
router.get("/lista_especialidades", (req, res) => {
  res.render("administrador/especialidad/lista_especialidades");
});

//Ir a la pantalla de los especialidades activos
router.get("/crear_especialidad", (req, res) => {
  res.render("administrador/especialidad/crear_especialidad");
});

//Ir a la pantalla para editar las especialidades
router.get("/especialidad/editar/:id", (req, res) => {
  res.render("administrador/especialidad/editar_especialidad", {id: req.params.id});
});

// =====================================================
//         Rutas gestionar especialiadad
// =====================================================

//Obtener todas las especialidades
router.get("/api/especialidad", obtenerEspecialidades);

//Obtener especialidad por id
router.get("/api/especialidad/:id", obtenerEspecialidadPorId);

//Modificar especialidad 
router.put("/api/especialidad/:id", updateEspecialidad);

//Crear todas las especialidades
router.post("/api/especialidad", validateSpecialty, validateSchema, crearEspecialidad);

module.exports = router;
