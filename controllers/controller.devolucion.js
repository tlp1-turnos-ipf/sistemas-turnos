const devolucionCtrl = {};
const DevolucionTurno = require("../models/DevolucionTurno");

devolucionCtrl.ctrlFindAllDevoluciones = async (req, res) => {
  try {
    const devoluciones = await DevolucionTurno.findAll();

    return res.status(200).json(devoluciones);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

devolucionCtrl.ctrlFindByIdDevolucion = async (req, res) => {
  const id = req.params.id;
  try {
    const devolucion = await DevolucionTurno.findByPk(id);

    return res.status(200).json(devolucion);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

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

devolucionCtrl.ctrlUpdateDevolucion = async (req, res) => {
  const { id } = req.params;
  try {
    //Se guardan los datos en la bd
    const nuevoDevolucion = await DevolucionTurno.update(req.body, {
      where: { id },
    });

    //En caso que haya errores al modificar una Devolucion
    if (!nuevoDevolucion) {
      throw {
        message: "Error al modificar la Devolucion",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json({ message: "Devolucion modificada Exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

//Controlador para eliminar devoluciones
devolucionCtrl.ctrlDeleteDevolucion = async (req, res) => {
  const { id } = req.params;
  try {
    //Se eliminan los datos en la bd
    const deleteDevolucion = await DevolucionTurno.destroy({
      where: { id: id },
    });

    //En caso que haya errores al eliminar un Devolucion
    if (!deleteDevolucion) {
      throw {
        message: "Error al eliminar el Devolucion",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json({ message: "Devolucion eliminada" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: "Error interno en el servidor",
    });
  }
};

module.exports = devolucionCtrl;
