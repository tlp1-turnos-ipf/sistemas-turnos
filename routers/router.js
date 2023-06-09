const express = require("express");
const router = express.Router();

//Inicio

router.get("/", (req, res)=>{
    res.render("index");
});

//Inicio Sesion

router.get("/inicio_sesion/index", (req, res)=>{
    res.render("inicio_sesion/index");
});

//Registrarse

router.get("/registrarse/index", (req, res)=>{
    res.render("registrarse/index");
});

//Autentificacion

const autentificacion = require('../controllers/autentificacion');
router.post('/autentificacion', autentificacion.autentificacion);


//Pacientes

const crud = require('../controllers/crud');
router.post('/savePaciente', crud.savePaciente);


//Doctores

const funciones_doctores = require('../controllers/funciones_doctores');
router.get('/doctores_pantalla_principal', funciones_doctores.pantalla_principal);



module.exports = router;