const express = require("express");
const router = express.Router();

//Inicio Principal

router.get("/", (req, res)=>{
    res.render("index");
});

//Inicio Sesion

router.get("/inicio_sesion", (req, res)=>{
    res.render("inicio_sesion/index");
});

//Autentificacion

const autentificacion = require('../controllers/autentificacion');
router.post('/autentificacion', autentificacion.autentificacion);

router.get('/logout', (req, res) =>{
    req.session.destroy(() =>{
        res.redirect("/")
    })
})

//Registrarse

router.get("/registrarse", (req, res)=>{
    res.render("registrarse/index");
});





//Pacientes

const pacientes = require('../controllers/paciente.controllers');
router.post('/savePaciente', pacientes.savePaciente);


//Doctores

const doctores = require('../controllers/doctores.controllers');
router.get('/doctores_pantalla_principal', doctores.pantalla_principal);
router.get('/pacientes_dia', doctores.pacientes_dia);



module.exports = router;