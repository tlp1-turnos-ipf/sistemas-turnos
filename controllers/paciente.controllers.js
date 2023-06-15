const conexion = require("../conection/db");

savePaciente = (req, res) => {
  const {nombre,apellido,fecha_nac,direccion, dni,email, sexo, telefono, discapacidad,nombre_usuario,password} = req.body;
  const rol = 1;

  conexion.query(
    "INSERT INTO personas SET ?",
    {
      nombres: nombre,
      apellidos: apellido,
      dni: dni,
      direccion: direccion,
      email: email,
      fecha_nac: fecha_nac,
      sexo: sexo,
      telefono: telefono,
      rol: rol,
    },
    (error, results) => {
      if (error) {
        throw error;
      }else{
        const id = results['insertId']; 

        conexion.query("INSERT INTO usuarios SET ?",{
          nombre_usuario: nombre_usuario,
          contrasenia: password,
          id_persona: id,
        });

        conexion.query("INSERT INTO pacientes SET ?",{
          id_persona: id,
          id_discapacidad: discapacidad,
        });
        res.render("registrarse/index",{
          alert: true,
          alertTitle: "Exitoso",
          alertMessage: "Registración Exitosa",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "inicio_sesion"
        })
      }
    }
  )  
}

module.exports = {savePaciente}