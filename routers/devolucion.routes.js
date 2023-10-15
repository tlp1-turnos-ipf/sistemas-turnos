const router = require("express").Router();

const {ctrlCrearDevolucion} = require("../controllers/controller.devolucion")

// Nueva devolucion del paciente
router.post("/api/devolucion", ctrlCrearDevolucion);


module.exports = router;