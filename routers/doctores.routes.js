const router = require("express").Router();

const {
  crearDoctor,
  obtenerDoctores,
  obtenerDoctor,
  modificarDoctor,
  modificarEstadoDoctor,
  eliminarDoctor,
  obtenerDoctoresCompleto,
} = require("../controllers/controllers.doctores");

//Ir a la pantalla de los doctores
router.get("/lista_doctores", (req, res) => {
  res.render("administrador/doctor/lista_doctores");
});

//Ir a la pantalla de los doctores completo
router.get("/lista_doctores_completo", (req, res) => {
  res.render("administrador/doctor/lista_doctores_completo");
});

//Ir a la pantalla para crear un doctor
router.get("/crear_doctor", (req, res) => {
  res.render("administrador/doctor/crear_doctor");
});

//Ruta para ir a la pantalla de modificación
router.get("/doctor/editar/:persona_id", (req, res) => {
  const personaId = req.params.persona_id;
  res.render("administrador/doctor/editar_doctor", { id: personaId });
});

// =====================================================
//         Rutas gestionar Doctores
// =====================================================

//Crear Doctor
router.post("/api/doctor", crearDoctor);

//Obtener todos todos los doctores
router.get("/api/doctor", obtenerDoctores);

//Obtener todos todos los doctores
router.get("/api/doctor/completo", obtenerDoctoresCompleto);

//Obtener un Doctor
router.get("/api/doctor/:id", obtenerDoctor);

//Modificar doctor
router.put("/api/doctor/:id", modificarDoctor);
//Modificar doctor
router.put("/api/doctor/estado/:id", modificarEstadoDoctor);

//Eliminar un doctor de manera lógica
router.delete("/api/doctor/:id", eliminarDoctor);

module.exports = router;
