const router = require("express").Router();

const {
  ctrlCrearDevolucion,
  ctrlFindAllDevoluciones,
  ctrlDeleteDevolucion,
  ctrlFindByIdDevolucion,
  ctrlUpdateDevolucion,
} = require("../controllers/controller.devolucion");

// Nueva devolucion del paciente
router.post("/api/devolucion", ctrlCrearDevolucion);
router.get("/api/devolucion", ctrlFindAllDevoluciones);
router.get("/api/devolucion/:id", ctrlFindByIdDevolucion)
router.put("/api/devolucion/:id", ctrlUpdateDevolucion)
router.delete("/api/devolucion/:id", ctrlDeleteDevolucion);

module.exports = router;
