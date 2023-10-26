const adminCtrl = {};
const Persona = require("../models/Persona");
const Usuario = require("../models/Usuario");
const Sequelize = require("sequelize");


// Controlador para obtener todos los administradores
adminCtrl.obtenerAdmininistradores = async (req, res) => {

    try {
        const Admin = await Usuario.findAll({
            where: {
                rol: 2,
                estado: true
            },
            include: [{
                model: Persona,
                required: true,
            }]
        });

        return res.status(200).json(Admin);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || "Error al obtener los administradores",
        });
    }
};

//Controlador para obtener una persona en específico
adminCtrl.obtenerAdmin = async (req, res) => {
    try {
      const personaId = req.params.id;
  
      //Busca la persona mientras esté en estado true
      const persona = await Persona.findByPk(personaId);
  
      //Si no se encuentra el persona
      if (!persona) {
        throw {
          status: 400,
          message: "El administrador no existe",
        };
      }
  
      return res.status(200).json(persona);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  };  

//Controlador para modificar al administrador
adminCtrl.modificarAdmin = async (req, res) => {
    const { id } = req.params;

    const { nombres, apellidos, fecha_nac, dni, direccion, telefono } = req.body;

    try {
        const adminActualizado = await Persona.update(
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

        if (!adminActualizado) {
            throw {
                status: 400,
                message: "No se pudo actualizar el administrador",
            };
        }

        return res.json({
            message: "Actualizado correctamente",
            adminActualizado,
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
adminCtrl.eliminarAdmin = async (req, res) => {
    const { id } = req.params;
    try {
      const adminEliminado = await Usuario.update(
        {
          estado: false,
        },
        {
          where: {
            usuario_id: id,
          },
        }
      );
  
      if (!adminEliminado) {
        throw {
          status: 400,
          message: "No se pudo eliminar el administrador",
        };
      }
  
      return res.json({
        message: "Eliminado correctamente",
        adminEliminado,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        message:
          error.message || "Error de servidor, contacte al area de sistemas",
      });
    }
  };

module.exports = adminCtrl;