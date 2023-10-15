const router = require("express").Router();

const {
  crearTurno,
  obtenerTurnos,
  obtenerTurnoPorId,
  reprogramarTurno,
  eliminarTurno
} = require("../controllers/controllers.turnos");

//Ir a la pantalla de los turnos
router.get("/lista_turnos", (req, res) => {
  res.render("administrador/lista_turnos");
});

//Ir a la pantalla para crear un turno
router.get("/crear_turno/:id", (req, res) => {
  const doctorFechaId = req.params.id;
  res.render("administrador/crear_turno", { id: doctorFechaId });
});

//Ir a la pantalla para crear un horario
router.get("/reprogramar/turno/:id", (req, res) => {
  res.render("administrador/reprogramar_turno", { id: req.params.id, user: req.cookies.name });
});

// =====================================================
//         Rutas gestionar turnos
// =====================================================

//Agregar los turnos desde los horarios
router.post("/api/turno/:id", crearTurno);

//Programar turno
router.get("/api/turno/reprogramar/:id", obtenerTurnoPorId);

//Obtener todos los turnos
router.get("/api/turno", obtenerTurnos);

//Eliminar turno
router.delete("/api/turno/:id", eliminarTurno);

//Reprogramar turno
router.put("/api/turno/actualizar/:id", reprogramarTurno)

module.exports = router;
