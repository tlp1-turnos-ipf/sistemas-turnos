const router = require("express").Router();

const { ctrlLoginUser, ctrlGetUserInfoByToken, deleteToken } = require("../controllers/controllers.auth");
const { crearPersona } = require("../controllers/controllers.persona");
// =====================================================
// Rutas para renderizar las vistas de login y registro
// =====================================================

//Ir la la pantalla del login
router.get("/login", (req, res) => res.render("auth/login"));

//Ir a la pantalla de registro
router.get("/register", (req, res) => res.render("auth/registrarse_en_linea"));

// =====================================================
//         Rutas para autenticar y registrar usuarios
// =====================================================

// Nuevo Registro en línea
router.post("/api/persona/registro", crearPersona);

//Login
router.post("/auth/login", ctrlLoginUser);

//Buscar Info del Token
router.get('/auth/token', ctrlGetUserInfoByToken)



module.exports = router;
