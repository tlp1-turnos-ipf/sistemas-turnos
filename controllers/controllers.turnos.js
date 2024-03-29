const turnosCtrl = {};
const Turno = require("../models/Turno");
const DoctorFecha = require("../models/DoctorFecha");
const Doctor = require("../models/Doctor");
const Usuario = require("../models/Usuario");
const Persona = require("../models/Persona");
const Paciente = require("../models/Paciente");
const Especialidad = require("../models/Especialidad");
const Sequelize = require("sequelize");

//Obtener todos los turnos del dia del doctor
turnosCtrl.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll({
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

//Controlador para crear turnos desde los pacientes
turnosCtrl.crearTurnoPaciente = async (req, res) => {
  const { fecha_id } = req.body;
  try {
    const paciente_id = req.cookies.id;
    const paciente = await Paciente.findOne({
      where: { usuario_id: paciente_id },
    });

    const pacienteID = paciente.paciente_id;

    // Consultar la DoctorFecha correspondiente al id
    const doctorFecha = await DoctorFecha.findByPk(fecha_id);

    if (doctorFecha.cantidad_turnos > 0) {
      //Se guardan los datos en la bd
      const nuevoTurno = await Turno.create({
        paciente_id: pacienteID,
        doctor_fecha_id: fecha_id,
      });

      // Reducir la cantidad de turnos en 1
      await doctorFecha.decrement("cantidad_turnos", { by: 1 });

      //En caso que haya errores al guardar un Turno
      if (!nuevoTurno) {
        throw {
          message: "Error al crear el Turno",
        };
      }
    }

    return res.status(200).json({ mensaje: "Turno creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
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
  const { doctor_fecha_id } = req.body;

  try {
    const turnoReprogramado = await Turno.update(
      {
        doctor_fecha_id,
      },
      {
        where: {
          turno_id: id,
        },
      }
    );

    if (!turnoReprogramado) {
      throw {
        status: 400,
        message: "No se pudo reprogramar el turno",
      };
    }

    return res.json({
      message: "Reprogramado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

//Reprogramar Turno
turnosCtrl.eliminarTurno = async (req, res) => {
  const { id } = req.params;

  try {
    const turnoEliminado = await Turno.update(
      {
        estado_turno: false,
      },
      {
        where: {
          turno_id: id,
        },
      }
    );

    if (!turnoEliminado) {
      throw {
        status: 400,
        message: "No se pudo eliminar",
      };
    }

    return res.json({
      message: "Finalizado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

module.exports = turnosCtrl;
