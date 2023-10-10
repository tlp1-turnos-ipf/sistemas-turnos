const turnosCtrl = {};
const Turno = require("../models/Turno");
const DoctorFecha = require("../models/DoctorFecha");
const Doctor = require("../models/Doctor");
const Usuario = require("../models/Usuario");
const Persona = require("../models/Persona");
const Paciente = require("../models/Paciente");
const Especialidad = require("../models/Especialidad");
const jwt = require('jsonwebtoken'); 

// Controlador para obtener todos los turnos
turnosCtrl.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll({
      where: {
        estado_turno: 1,
      },

      include: [
        {
          model: DoctorFecha,
          attributes: ["fecha"],
          include: {
            model: Doctor,
            include: [
              {
                model: Usuario,
                attributes: ["persona_id"],
                include: {
                  model: Persona,
                },
              },
              {
                model: Especialidad,
              },
            ],
          },
        },
        {
          model: Paciente,
          include: {
            model: Usuario,

            include: {
              model: Persona,
            },
          },
        },
      ],
    });

    if (!turnos) {
      throw {
        status: 404,
        message: "No se encontraron turnos",
      };
    }

    return res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los turnos",
    });
  }
};

//Controlador para crear a los turnos
turnosCtrl.crearTurno = async (req, res) => {
  const { id } = req.params;
  const { paciente_id } = req.body;

  try {
    // Consultar la DoctorFecha correspondiente al id
    const doctorFecha = await DoctorFecha.findByPk(id);

    if (doctorFecha.cantidad_turnos > 0) {
      //Se guardan los datos en la bd
      const nuevoTurno = await Turno.create({
        paciente_id: paciente_id,
        doctor_fecha_id: id,
      });

      // Reducir la cantidad de turnos en 1
      await doctorFecha.decrement("cantidad_turnos", { by: 1 });

      //En caso que haya errores al guardar un Turno
      if (!nuevoTurno) {
        throw {
          message: "Error al crear el Turno",
        };
      }

      // Se retorna la respuesta al cliente
      return res.status(201).json({ message: "Turno Creado Exitosamente" });
    } else {
      return res.status(400).json({ message: "No hay turnos disponibles" });
    }
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error al crear el Turno",
    });
  }
};

//Obtener todos los turnos del dia del doctor
turnosCtrl.obtenerTurnosDelDia = async (req, res) => {
  const token = req.headers.authorization; // Supongamos que el token se pasa en los encabezados
  try {
    

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

     // Decodificar el token para obtener el ID del usuario
     const { user: id } = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'); 


    const turnos = await Turno.findAll({
      where: {
        estado_turno: 1,
      },

      include: [
        {
          model: DoctorFecha,
          attributes: ["fecha"],
          include: {
            model: Doctor,
            include: [
              {
                model: Usuario,
                where: {
                  usuario_id: id
                },
                include: {
                  model: Persona,
                },
              },
              {
                model: Especialidad,
              },
            ],
          },
        },
        {
          model: Paciente,
          include: {
            model: Usuario,

            include: {
              model: Persona,
            },
          },
        },
      ],
    });

    if (!turnos) {
      throw {
        status: 404,
        message: "No se encontraron turnos",
      };
    }

    return res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los turnos",
    });
  }
};


module.exports = turnosCtrl;
