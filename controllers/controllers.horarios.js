const horariosCtrl = {};
const DoctorFecha = require("../models/DoctorFecha");
const Sequelize = require("sequelize");

//Controlador para crear a los horarios
horariosCtrl.crearHorario = async (req, res) => {
  const { id } = req.params;
  const { cantidad_turnos, fecha, horario_inicio, horario_fin, descripcion } =
    req.body;

  try {
    //Se guardan los datos en la bd
    const nuevoHorario = await DoctorFecha.create({
      doctor_id: id,
      fecha,
      horario_inicio,
      horario_fin,
      descripcion,
      cantidad_turnos,
    });

    //En caso que haya errores al guardar un horario
    if (!nuevoHorario) {
      throw {
        message: "Error al crear el Horario",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json({ message: "Horario Creado Exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error al crear el horario",
    });
  }
};

// Controlador para obtener todos los horarios
horariosCtrl.obtenerHorarios = async (req, res) => {
  const { id } = req.params;
  try {
    const horarios = await DoctorFecha.findAll({
      where: {
        doctor_id: id,
        cantidad_turnos: {
          [Sequelize.Op.gt]: 0,
        },
      },
    });

    return res.status(200).json(horarios);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los horarios",
    });
  }
};

//Controlador para obtener un horario en específico
horariosCtrl.obtenerHorario = async (req, res) => {
  try {
    const id = req.params.id;

    //Busca la persona mientras esté en estado true
    const fecha = await DoctorFecha.findByPk(id);

    //Si no se encuentra el persona
    if (!fecha) {
      throw {
        status: 400,
        message: "La fecha no existe",
      };
    }

    return res.status(200).json(fecha);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

//Controlador para modificar al horario
horariosCtrl.modificarHorario = async (req, res) => {
  const { id } = req.params;

  const { fecha, cantidad_turnos, horario_inicio, horario_fin, descripcion } =
    req.body;

  try {
    const fechaActualizado = await DoctorFecha.update(
      {
        fecha,
        horario_inicio,
        horario_fin,
        descripcion,
        cantidad_turnos,
      },
      {
        where: {
          doctor_fecha_id: id,
        },
      }
    );

    if (!fechaActualizado) {
      throw {
        status: 400,
        message: "No se pudo actualizar la fecha",
      };
    }

    return res.json({
      message: "Actualizado correctamente",
      fechaActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message:
        error.message || "Error de servidor, contacte al area de sistemas",
    });
  }
};

module.exports = horariosCtrl;
