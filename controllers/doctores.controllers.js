const conexion = require("../conection/db");

pantalla_principal = (req, res) => {
    if(req.session.loggedin){
        res.render("doctores/pantalla_principal",{
            login: true,
            usuario: req.session.usuario
        })
    }else{
        res.render("inicio_sesion/index",{
            login: false,
            usuario: "Debe Iniciar Sesion"

        })
    }
}

pacientes_dia = (req, res) => {
    if(req.session.loggedin){
        res.render("doctores/pacientes_dia",{
            login: true,
            usuario: req.session.usuario
        })
    }else{
        res.render("inicio_sesion/index",{
            login: false,
            usuario: "Debe Iniciar Sesion"

        })
    }
}


module.exports = {pantalla_principal, pacientes_dia}