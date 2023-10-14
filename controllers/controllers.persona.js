const Ctrl = {};
const Persona = require("../models/Persona");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
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
    const existePersona = await Persona.findOne({ where: { dni } });

    if (existePersona) {
      return res.status(400).json({ message: "La persona la existe" });
    }

    const roles = await Rol.findAll();

    if (!roles) {
      return res
        .status(400)
        .json({ message: "Primero es necesario que cargue los roles" });
    }

    //Verifica si existe el usuario
    const existeUsuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (existeUsuario) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con el mismo email" });
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
    return res.status(201).json({ status: 201 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Interno del servidor",
    });
  }
};

module.exports = Ctrl;
