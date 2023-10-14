const turnosCtrl = {};
const Turno = require("../models/Turno");
const DoctorFecha = require("../models/DoctorFecha");
const Doctor = require("../models/Doctor");
const Usuario = require("../models/Usuario");
const Persona = require("../models/Persona");
const Paciente = require("../models/Paciente");
const Especialidad = require("../models/Especialidad");

//Obtener todos los turnos del dia del doctor
turnosCtrl.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll({
      where: {
        estado_turno: 1,
      },
      include: [
        {
          model: DoctorFecha,
          include: {
            model: Doctor,
            include: [
              {
                model: Usuario,
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
//Obtener todos los turnos del dia del doctor
turnosCtrl.obtenerTurnoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const turnos = await Turno.findOne({
      where: {
        estado_turno: 1,
        turno_id: id,
      },
      include: [
        {
          model: DoctorFecha,
          include: {
            model: Doctor,
            include: [
              {
                model: Usuario,
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
    return res.status(500).json({
      message: "Error al obtener el turno",
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

//Reprogramar Turno
turnosCtrl.reprogramarTurno = async (req, res) => {
  const { id } = req.params;
  const {doctor_fecha_id} = req.body;

  try {
    const turnoReprogramado = await Turno.update(
      {
        doctor_fecha_id
      },
      {
        where: {
          turnos_id: id,
        },
      }
    );

    if (!turnoReprogramado) {
      throw {
        status: 400,
        message: "No se pudo actualizar la especialidad",
      };
    }

    return res.json({
      message: "Actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
       "Error interno del servidor",
    });
  }
};



//Obtener todos los turnos del dia del doctor
turnosCtrl.obtenerTurnosDelDia = async (req, res) => {
  const usuario_id = req.cookies.id;

  try {
    const turnos = await Turno.findAll({
      where: {
        estado_turno: true,
      },
      include: [
        {
          model: DoctorFecha,
          include: {
            model: Doctor,
            include: [
              {
                model: Usuario,
                where: {
                  usuario_id,
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
    console.log(turnos.length);

    return res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los turnos",
    });
  }
};

module.exports = turnosCtrl;
