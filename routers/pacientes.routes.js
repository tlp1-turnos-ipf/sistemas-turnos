const router = require("express").Router();

const {
  crearPaciente,
  obtenerPacientes,
  obtenerPacientesCompleto,
  obtenerPaciente,
  modificarPaciente,
  modificarEstadoPaciente,
  eliminarPaciente,
} = require("../controllers/controllers.pacientes");

//Ir a la pantalla de los pacientes activos
router.get("/lista_pacientes", (req, res) => {
  res.render("administrador/paciente/lista_pacientes");
});

//Ir a la pantalla de los pacientes completos
router.get("/lista_pacientes_completos", (req, res) => {
  res.render("administrador/paciente/lista_pacientes_completos");
});

//Ir a la pantalla para crear un Paciente
router.get("/crear_paciente", (req, res) => {
  res.render("administrador/paciente/crear_paciente");
});

//Ruta para ir a la pantalla de modificación
router.get("/paciente/editar/:persona_id", (req, res) => {
  const personaId = req.params.persona_id;
  res.render("administrador/paciente/editar_paciente", { id: personaId });
});

// =====================================================
//         Rutas gestionar pacientes
// =====================================================

//Crear Paciente
router.post("/api/paciente", crearPaciente);

//Obtener todos todos los pacientes activos
router.get("/api/paciente", obtenerPacientes);

//Obtener todos todos los pacientes completos
router.get("/api/paciente/completo", obtenerPacientesCompleto);

//Obtener un Paciente
router.get("/api/paciente/:id", obtenerPaciente);

//Modificar Paciente
router.put("/api/paciente/:id", modificarPaciente);

//Modificar Estado del paciente
router.put("/api/paciente/estado/:id", modificarEstadoPaciente);

//Eliminar un paciente de manera lógica
router.delete("/api/paciente/:id", eliminarPaciente);

module.exports = router;
