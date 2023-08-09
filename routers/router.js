const express = require("express");
const router = express.Router();

//Inicio Principal
router.get("/", (req, res)=>{
    res.render("index");
});

//Inicios

router.get("/paciente", (req, res)=>{
    res.render("principal_paciente")
})
router.get("/doctor", (req, res)=>{
    res.render("principal_doctor")
})
router.get("/administrador", (req, res)=>{
    res.render("principal_administrador")
})


//Inicio Sesion
router.get("/inicio_sesion", (req, res)=>{
    res.render("inicio_sesion/index");
});


//Autentificacion
const autentificacion = require('../controllers/autentificacion');
router.post('/autentificacion/paciente', autentificacion.autentificacion_paciente);
router.post('/autentificacion/doctor', autentificacion.autentificacion);
router.post('/autentificacion/administrador', autentificacion.autentificacion_admin);
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
router.get('/paciente_pantalla_principal', pacientes.pantalla_principal);



//Funciones para sacar turnos
const turnos = require('../controllers/turnos.controllers');
router.get("/solicitar_turno", turnos.buscar_especialidades);
router.get("/seleccionar_doctor/:especialidad_id", turnos.buscar_doctores);
router.get("/seleccionar/fecha_turno/:doctor_id", turnos.buscar_fechas);
router.get("/seleccionar/fecha_horario/:fecha_turno_id", turnos.buscar_horario);
router.get("/seleccionar/crear_turno/:doctor_fecha_horario_id", turnos.crear_turno);
router.post("/pacientes/insertar_turno", turnos.insertar_turno);


//Doctores
const doctores = require('../controllers/doctores.controllers');
router.get('/doctores_pantalla_principal', doctores.pantalla_principal);
router.get('/doctores_atender/:turnos_id', doctores.atender_paciente);
router.post('/doctor_devolucion_turno', doctores.devolucion_turno_paciente);
router.get('/editar_devolucion_doctor/:devolucion_id', doctores.editar_devolucion_doctor);
router.get('/eliminar_devolucion_doctor/:devolucion_id', doctores.eliminar_devolucion_doctor);
router.get('/modificar_devolucion_turno', doctores.modificar_devolucion_turno);

router.get('/listar_turnos_completos', doctores.listar_turnos_completos);


//Administradores
const admin = require('../controllers/admin.controllers');
router.get('/administrador_pantalla_principal', admin.pantalla_principal);
router.get('/admin_pacientes', admin.admin_pacientes);
router.get('/admin_eliminar_paciente/:eliminar_paciente', admin.eliminar_pacientes);
router.get('/admin_agregar_paciente', admin.agregar_pacientes);
router.post('/accion_crear_paciente', admin.crear_pacientes);

module.exports = router;