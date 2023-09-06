const doctoresCtrl = {};
const bcrypt = require("bcrypt");
const Persona = require("../models/Persona");
const Usuario = require("../models/Usuario");
const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");
const Especialidad = require("../models/Especialidad");

//Controlador para crear a los docotores activos
doctoresCtrl.crearDoctor = async (req, res) => {
  const { especialidad } = req.body;

  try {
    //Obtenemos el ultimo id de especialidad
    const ultimoIdEspecialidad = await Especialidad.findOne();
    //En caso que haya errores al guardar un Doctor
    if (!ultimoIdEspecialidad) {
      throw {
        message: "Primero cargue una especialidad",
      };
    }

    //Obtenemos el id de la ultima persona creada
    const ultimoIdUsuario = await Usuario.max("usuario_id");

    //Se guardan los datos en la bd
    const nuevoDoctor = await Doctor.create({
      usuario_id: ultimoIdUsuario,
      especialidad_id: especialidad,
    });

    //En caso que haya errores al guardar un Doctor
    if (!nuevoDoctor) {
      throw {
        message: "Error al crear el Doctor",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json({ message: "Doctor Creado Exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error al crear el Doctor",
    });
  }
};

// Controlador para obtener todos los doctores
doctoresCtrl.obtenerDoctores = async (req, res) => {
  try {
    const doctores = await Doctor.findAll({
      include: [
        {
          model: Especialidad,
        },
        {
          model: Usuario,

          include: {
            model: Persona,
          },
        },
      ],
    });

    if (!doctores) {
      throw {
        status: 404,
        message: "No se encontraron doctores",
      };
    }

    return res.status(200).json(doctores);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los doctores",
    });
  }
};

// Controlador para obtener todos los doctores
doctoresCtrl.obtenerDoctoresCompleto = async (req, res) => {
  try {
    const doctores = await Doctor.findAll({
      include: [
        {
          model: Especialidad,
        },
        {
          model: Usuario,
          include: {
            model: Persona,
          },
        },
      ],
    });

    if (!doctores) {
      throw {
        status: 404,
        message: "No se encontraron doctores",
      };
    }

    return res.status(200).json(doctores);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los doctores",
    });
  }
};

//Controlador para obtener un doctor en específico
doctoresCtrl.obtenerDoctor = async (req, res) => {
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

//Controlador para modificar al doctor
doctoresCtrl.modificarDoctor = async (req, res) => {
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

//Controlador para modificar el estado del doctor
doctoresCtrl.modificarEstadoDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctorActivado = await Usuario.update(
      {
        estado: true,
      },
      {
        where: {
          usuario_id: id,
        },
      }
    );

    if (!doctorActivado) {
      throw {
        status: 400,
        message: "No se pudo cambiar el estado del doctor",
      };
    }

    return res.json({
      message: "Activado correctamente",
      doctorActivado,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message:
        error.message || "Error de servidor, contacte al area de sistemas",
    });
  }
};

//Controlador para eliminar al doctor
doctoresCtrl.eliminarDoctor = async (req, res) => {
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
        message: "No se pudo eliminar al doctor",
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

module.exports = doctoresCtrl;
