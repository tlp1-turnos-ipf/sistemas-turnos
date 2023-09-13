const { validationResult } = require('express-validator');

// verifica si hay errores de validación
const validateSchema = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {validateSchema};