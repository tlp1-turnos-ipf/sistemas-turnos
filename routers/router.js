const express = require("express");
const router = express.Router();

const conexion = require("../conection/db");

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


//Pacientes

const crud = require('../controllers/crud');
router.post('/savePaciente', crud.savePaciente);




module.exports = router;