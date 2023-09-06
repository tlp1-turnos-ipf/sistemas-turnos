const router = require("express").Router();

const {
  obtenerHorarios,
  obtenerHorario,
  crearHorario,
  modificarHorario
} = require("../controllers/controllers.horarios");

//Ir a la pantalla de los horarios
router.get("/lista_horarios/:doctor_id", (req, res) => {
  const doctorId = req.params.doctor_id;
  res.render("administrador/fechas/lista_horario_doctor", { id: doctorId });
});

//Ir a la pantalla para crear un horario
router.get("/crear_horario/:id", (req, res) => {
  const doctorId = req.params.id;
  res.render("administrador/fechas/crear_horario_doctor", { id: doctorId });
});

//Ir a la pantalla para editar un horario
router.get("/editar_horario/:id/:idTabla", (req, res) => {
  const doctorFechaId = req.params.id;
  const tablaHorario = req.params.idTabla;
  res.render("administrador/fechas/editar_horario_doctor", {
    id: doctorFechaId,
    idTabla: tablaHorario,
  });
});

// =====================================================
//         Rutas gestionar Horarios
// =====================================================

//Obtener todos los Horarios del doctor
router.get("/api/horarios/:id", obtenerHorarios);

//Obtener un horario
router.get("/api/horario/:id", obtenerHorario);

//Modificar un horario
router.put("/api/horario/:id", modificarHorario);

//Agregar los Horarios del doctor
router.post("/api/horario/:id", crearHorario);

module.exports = router;
