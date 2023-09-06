const Ctrl = {};
const Persona = require("../models/Persona");
const Usuario = require("../models/Usuario");
const Paciente = require("../models/Paciente");

// Controlador para crear nuevo Persona
Ctrl.crearPersona = async (req, res) => {
  const {
    nombres,
    apellidos,
    fecha_nac,
    dni,
    direccion,
    telefono,
    sexo,
    email,
  } = req.body;

  try {
    // Se verifica si la persona ya existe
    const existePersona = await Persona.findOne({
      where: {
        dni,
      },
    });

    if (existePersona) {
      throw {
        // throw siempre debe ejecutarse dentro de un try catch
        status: 400,
        message: "La Persona ya existe",
      };
    }

    //Verifica si existe el usuario
    const existeUsuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (existeUsuario) {
      throw {
        // throw siempre debe ejecutarse dentro de un try catch
        status: 400,
        message: "Ya existe un usuario con el mismo email",
      };
    }

    //Se crea a la persona
    const nuevoPersona = await Persona.create({
      nombres,
      apellidos,
      dni,
      direccion,
      fecha_nacimiento: fecha_nac,
      sexo,
      telefono,
    });

    if (!nuevoPersona) {
      throw {
        message: "Error al crear el Persona",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json(nuevoPersona.persona_id);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al crear la persona",
    });
  }
};

module.exports = Ctrl;
