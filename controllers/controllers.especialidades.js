const EspecialidadesCtrl = {};
const bcrypt = require("bcrypt");
const Persona = require("../models/Persona");
const Usuario = require("../models/Usuario");
const Especialidad = require("../models/Especialidad");
const Sequelize = require("sequelize");

// Controlador para obtener todos los Especialidades activos
EspecialidadesCtrl.obtenerEspecialidades = async (req, res) => {
  try {
    const Especialidades = await Especialidad.findAll();

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

module.exports = EspecialidadesCtrl;
