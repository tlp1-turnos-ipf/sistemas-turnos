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
//Cerrar sesion
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
router.get('/doctores_atender/:turnos_id', doctores.atender_paciente);
router.post('/doctor_devolucion_turno', doctores.devolucion_turno_paciente);
router.get('/editar_devolucion_doctor/:devolucion_id', doctores.editar_devolucion_doctor);
router.get('/eliminar_devolucion_doctor/:devolucion_id', doctores.eliminar_devolucion_doctor);


module.exports = router;