const EspecialidadesCtrl = {};
const Especialidad = require("../models/Especialidad");

// Controlador para obtener todos las Especialidades
EspecialidadesCtrl.obtenerEspecialidades = async (req, res) => {
  try {
    const Especialidades = await Especialidad.findAll()

    if (!Especialidades) {
      throw {
        status: 404,
        message: "No se encontraron Especialidades",
      };
    }

    return res.status(200).json(Especialidades);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los Especialidades",
    });
  }
};

// Controlador para obtener especialidad por id
EspecialidadesCtrl.obtenerEspecialidadPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const especialidad = await Especialidad.findByPk(id)

    if (!especialidad) {
      throw {
        status: 404,
        message: "No se encontró la especialidad",
      };
    }

    return res.status(200).json(especialidad);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del Servidor",
    });
  }
};

//Crear Especialidad
EspecialidadesCtrl.crearEspecialidad = async (req, res) => {
  const { descripcion_especialidad } = req.body;

  try {
    const especialidad = await Especialidad.create({
      descripcion_especialidad,
    });
    //En caso que haya errores al guardar la especialidad
    if (!especialidad) {
      throw {
        message: "Error al crear la especialidad",
      };
    }
    // Se retorna la respuesta al cliente
    return res
      .status(201)
      .json({ message: "Especialidad Creado Exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error al crear la especialidad",
    });
  }
};

//Modificar especialidad
EspecialidadesCtrl.updateEspecialidad = async (req, res) => {
  const { id } = req.params;

  const { descripcion_especialidad } = req.body;

  try {
    const especialidadUpdate = await Especialidad.update(
      {
        descripcion_especialidad
      },
      {
        where: {
          especialidad_id: id,
        },
      }
    );

    if (!especialidadUpdate) {
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


module.exports = EspecialidadesCtrl;
