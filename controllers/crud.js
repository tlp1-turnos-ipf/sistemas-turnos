const conexion = require("../conection/db");

exports.savePaciente = (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const fechaNacimiento = req.body.fecha_nac;
  const dni = req.body.dni;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const sexo = req.body.sexo;
  const telefono = req.body.telefono;
  const rol = 1;
  const discapacidad = req.body.discapacidad;

  const nombre_usuario = req.body.nombre_usuario;
  const password = req.body.password;

  conexion.query(
    "INSERT INTO personas SET ?",
    {
      nombres: nombre,
      apellidos: apellido,
      dni: dni,
      direccion: direccion,
      email: email,
      fecha_nac: fechaNacimiento,
      sexo: sexo,
      telefono: telefono,
      id_especialidad: 0,
      id_discapacidad: discapacidad,
      rol: rol,
    },
    
    (error, results) => {
      if (error) {
        throw error;
      } else {
        const { persona_id } = results.persona_id;
        res.send(persona_id);
        // "INSERT INTO usuarios SET ?",
        //   {
        //     nombre_usuario: nombre_usuario,
        //     contrasenia: password,
        //     id_persona: id,
           
        //   },
        //   (error, results) => {
        //     if (error) {
        //       throw error;
        //     } else {
        //       res.redirect("/");
        //     }
        //   };
      }
    }
  );
};
