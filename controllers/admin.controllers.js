const conexion = require("../conection/db");

pantalla_principal = (req, res) => {
  const id = req.session.usuario;

  res.render("administrador/index", {
    ruta:""
  });
};

//MANEJANDO PACIENTES
admin_pacientes = (req, res) => {

  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `pacientes` LEFT JOIN personas ON pacientes.id_persona = personas.persona_id",
      (error, results) => {
        req.session.results_pantalla_principal = results;
        res.render("administrador/lista_pacientes", {
          results: results,
          login: true,
          nombres: req.session.nombres,
          apellidos: req.session.apellidos,
        });
      }
    );
  } else {
    res.render("inicio_sesion/index", {
      alert: true,
      alertTitle: "Fallo",
      alertMessage: "No ha iniciado sesión",
      alertIcon: "error",
      showConfirmButton: false,
      timer: 1500,
      ruta: "inicio_sesion",
    });
  }
};

eliminar_pacientes = (req, res) => {
  const id = req.params.eliminar_paciente;
 

  if (req.session.loggedin) {
    conexion.query(
      "DELETE FROM pacientes WHERE paciente_id = ?",
      [id],
      (error, results) => {
        res.render("administrador/index",{
          alert: true,
          alertTitle: "Exitoso",
          alertMessage: "Eliminación Exitosa",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "admin_pacientes"
        })
        res.render("administrador/index");
      }
    );
  } else {
    res.render("inicio_sesion/index", {
      alert: true,
      alertTitle: "Fallo",
      alertMessage: "No ha iniciado sesión",
      alertIcon: "error",
      showConfirmButton: false,
      timer: 1500,
      ruta: "inicio_sesion",
    });
  }
};

agregar_pacientes = (req, res) => {

  if (req.session.loggedin) {
   
        res.render("administrador/crear_paciente");

  } else {
    res.render("inicio_sesion/index", {
      alert: true,
      alertTitle: "Fallo",
      alertMessage: "No ha iniciado sesión",
      alertIcon: "error",
      showConfirmButton: false,
      timer: 1500,
      ruta: "inicio_sesion",
    });
  }
};


crear_pacientes = (req, res) => {
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
        res.render("administrador/index",{
          alert: true,
          alertTitle: "Exitoso",
          alertMessage: "Registración Exitosa",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "admin_pacientes"
        })
      }
    }
  )  
}

editar_pacientes = (req, res) => {
  const paciente_id = req.params.editar_paciente;

  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `pacientes` LEFT JOIN personas ON pacientes.id_persona = personas.persona_id WHERE paciente_id = ? ",
      [paciente_id],
      (error, results) => {
        res.render("administrador/editar_paciente", {
          results: results[0],
          login: true,
        });
      }
    );
  } else {
    res.render("inicio_sesion/index", {
      alert: true,
      alertTitle: "Fallo",
      alertMessage: "No ha iniciado sesión",
      alertIcon: "error",
      showConfirmButton: false,
      timer: 1500,
      ruta: "inicio_sesion",
      login: false,
    });
  }
};

modificar_pacientes = (req, res) => {

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
        res.render("administrador/index",{
          alert: true,
          alertTitle: "Exitoso",
          alertMessage: "Registración Exitosa",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "admin_pacientes"
        })
      }
    }
  )  
}

//MANEJANDO DOCTORES

admin_doctores = (req, res) => {

  if (req.session.loggedin) {
    conexion.query(
      "SELECT * FROM `doctores` LEFT JOIN personas ON doctores.id_persona = personas.persona_id",
      (error, results) => {
        req.session.results_pantalla_principal = results;
        res.render("administrador/lista_doctores", {
          results: results,
          login: true,
          nombres: req.session.nombres,
          apellidos: req.session.apellidos,
        });
      }
    );
  } else {
    res.render("inicio_sesion/index", {
      alert: true,
      alertTitle: "Fallo",
      alertMessage: "No ha iniciado sesión",
      alertIcon: "error",
      showConfirmButton: false,
      timer: 1500,
      ruta: "inicio_sesion",
    });
  }
};



module.exports = {
  pantalla_principal,
  admin_pacientes,
  eliminar_pacientes,
  agregar_pacientes,
  crear_pacientes,
  editar_pacientes,
  modificar_pacientes,
  admin_doctores
};
