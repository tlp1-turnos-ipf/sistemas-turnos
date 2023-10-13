const pacientesCtrl = {};
const bcrypt = require("bcrypt");
const Persona = require("../models/Persona");
const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");
const Paciente = require("../models/Paciente");
const Sequelize = require("sequelize");

//Controlador para crear a los pacientes
pacientesCtrl.crearPaciente = async (req, res) => {
  const { discapacidad } = req.body;

  try {
    //Obtenemos el id de la ultima persona creada
    const ultimoIdUsuario = await Usuario.max("usuario_id");

    const roles = await Rol.findAll();

    if(!roles) {
      return res.status(400).json({message:"Primero es necesario que cargue los roles"})
    }


    //Se guardan los datos en la bd
    const nuevoUsuario = await Paciente.create({
      usuario_id: ultimoIdUsuario,
      id_discapacidad: discapacidad,
    });

    //En caso que haya errores al guardar un paciente
    if (!nuevoUsuario) {
      throw {
        message: "Error al crear el Paciente",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json({ message: "Paciente Creado Exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error al crear el usuario",
    });
  }
};

// Controlador para obtener todos los Pacientes activos
pacientesCtrl.obtenerPacientes = async (req, res) => {
  try {
    const Pacientes = await Paciente.findAll({
      include: {
        model: Usuario,
        where: {
          estado: true,
        },
        include: {
          model: Persona,
        },
      },
    });

    if (!Pacientes) {
      throw {
        status: 404,
        message: "No se encontraron Pacientes",
      };
    }

    return res.status(200).json(Pacientes);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los Pacientes",
    });
  }
};

// Controlador para obtener todos los Pacientes completos
pacientesCtrl.obtenerPacientesCompleto = async (req, res) => {
  try {
    const Pacientes = await Paciente.findAll({
      include: {
        model: Usuario,
        include: {
          model: Persona,
        },
      },
      order: [[Sequelize.literal("Usuario.estado"), "ASC"]],
    });

    if (!Pacientes) {
      throw {
        status: 404,
        message: "No se encontraron Pacientes",
      };
    }

    return res.status(200).json(Pacientes);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los Pacientes",
    });
  }
};

//Controlador para obtener una persona en específico
pacientesCtrl.obtenerPaciente = async (req, res) => {
  try {
    const personaId = req.params.id;

    //Busca la persona mientras esté en estado true
    const persona = await Persona.findByPk(personaId);

    //Si no se encuentra el persona
    if (!persona) {
      throw {
        status: 400,
        message: "La persona no existe",
      };
    }

    return res.status(200).json(persona);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

//Controlador para modificar al paciente
pacientesCtrl.modificarPaciente = async (req, res) => {
  const { id } = req.params;

  const { nombres, apellidos, fecha_nac, dni, direccion, telefono } = req.body;

  try {
    const personaActualizado = await Persona.update(
      {
        nombres,
        apellidos,
        fecha_nac,
        dni,
        direccion,
        telefono,
      },
      {
        where: {
          persona_id: id,
        },
      }
    );

    if (!personaActualizado) {
      throw {
        status: 400,
        message: "No se pudo actualizar el persona",
      };
    }

    return res.json({
      message: "Actualizado correctamente",
      personaActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message:
        error.message || "Error de servidor, contacte al area de sistemas",
    });
  }
};

//Controlador para modificar el estado del paciente
pacientesCtrl.modificarEstadoPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const pacienteActivado = await Usuario.update(
      {
        estado: true,
      },
      {
        where: {
          usuario_id: id,
        },
      }
    );

    if (!pacienteActivado) {
      throw {
        status: 400,
        message: "No se pudo eliminar el paciente",
      };
    }

    return res.json({
      message: "Activado correctamente",
      pacienteActivado,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message:
        error.message || "Error de servidor, contacte al area de sistemas",
    });
  }
};

//Controlador para eliminar la los pacientes
pacientesCtrl.eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const personaEliminado = await Usuario.update(
      {
        estado: false,
      },
      {
        where: {
          usuario_id: id,
        },
      }
    );

    if (!personaEliminado) {
      throw {
        status: 400,
        message: "No se pudo eliminar el paciente",
      };
    }

    return res.json({
      message: "Eliminado correctamente",
      personaEliminado,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message:
        error.message || "Error de servidor, contacte al area de sistemas",
    });
  }
};

module.exports = pacientesCtrl;
