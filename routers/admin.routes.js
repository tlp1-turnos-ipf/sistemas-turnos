const router = require("express").Router();

const { obtenerAdmininistradores, modificarAdmin, obtenerAdmin, eliminarAdmin } = require("../controllers/controller.admin")

//Pantalla principal de los administradores
router.get("/administrador", (req, res) => {
  res.render("administrador/index", {user: req.cookies.name, rol: req.cookies.rol});
});

router.get("/lista_admin", (req, res) => {
  res.render("administrador/admin/lista_admin");
})

router.get("/crear_admin", (req, res) => {
  res.render("administrador/admin/crear_admin");
})

router.get("/editar_admin/:persona_id", (req, res) => {
  const personaId = req.params.persona_id;
  res.render("administrador/admin/editar_admin", { id: personaId });
})

router.get("/api/admin", obtenerAdmininistradores);

router.get("/api/admin/:id", obtenerAdmin);

router.put("/api/admin/:id", modificarAdmin);

router.delete("/api/admin/:id", eliminarAdmin);

module.exports = router;
