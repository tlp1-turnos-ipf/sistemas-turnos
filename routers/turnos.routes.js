const router = require("express").Router();

const {
  crearTurno,
  obtenerTurnos,
} = require("../controllers/controllers.turnos");

//Ir a la pantalla de los turnos
router.get("/lista_turnos", (req, res) => {
  res.render("administrador/lista_turnos");
});

//Ir a la pantalla para crear un horario
router.get("/crear_turno/:id", (req, res) => {
  const doctorFechaId = req.params.id;
  res.render("administrador/crear_turno", { id: doctorFechaId });
});

// =====================================================
//         Rutas gestionar turnos
// =====================================================

//Agregar los turnos desde los horarios
router.post("/api/turno/:id", crearTurno);

//Obtener todos los turnos
router.get("/api/turno", obtenerTurnos);

module.exports = router;
