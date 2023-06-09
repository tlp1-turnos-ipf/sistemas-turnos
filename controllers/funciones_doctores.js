const conexion = require("../conection/db");

exports.pantalla_principal = (req, res) => {
    if(req.session.loggedin){
        res.send("listo")
    }
}