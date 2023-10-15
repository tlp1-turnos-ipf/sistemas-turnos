const devolucionCtrl = {};
const DevolucionTurno = require("../models/DevolucionTurno")

//Controlador para crear a los docotores activos
devolucionCtrl.ctrlCrearDevolucion = async (req, res) => {
  try {

    //Se guardan los datos en la bd
    const nuevoDevolucion = await DevolucionTurno.create(req.body);

    //En caso que haya errores al guardar un Devolucion
    if (!nuevoDevolucion) {
      throw {
        message: "Error al crear el Devolucion",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json({ message: "Devolucion Creado Exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error interno en el servidor",
    });
  }
};

module.exports = devolucionCtrl;