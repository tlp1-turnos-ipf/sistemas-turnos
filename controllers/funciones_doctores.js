const conexion = require("../conection/db");

exports.pantalla_principal = (req, res) => {
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