const { checkSchema } = require('express-validator');

// Se validan los datos de los usuarios
const validateUser = checkSchema({
  nombre_usuario: {
    notEmpty:{
      errorMessage:"¡El campo Nombre es obligatorio!"
    },
    isString:true
  },
  email: {
    isEmail: true,
    errorMessage: '¡Email no valido!'
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: '¡La contraseña debe tener minimo 8 caracteres!'
    }
  }
});

// Se validan los datos de las personas
const validatePerson = checkSchema({
  nombres: {
    isString: true
  },
  apellidos: {
    isString: true
  },
  dni: {
    isLength: {
        options: { min: 8 },
        errorMessage: '¡Este campo debe tener minimo 8 caracteres!'
      }
  },
  direccion: {
    notEmpty: { errorMessage: "Este campo es obligatorio" }
  },
  fecha_nacimiento: {
    isDate: {
        errorMessage: 'Fecha no valida'
    }
  },
  sexo: {
    isString: true
  },
  telefono: {
    isNumeric :{ errorMessage: 'Número de telefono invalido'}
  }
});

// Se validan los datos de las especialidades
const validateSpecialty = checkSchema({
  descripcion_especialidad: {
    notEmpty: {
      errorMessage: "¡No puedes enviar una especialidad vacia!"
    },
  isString: { errorMessage: "¡Solo ingresa letras!"}
  }
});

module.exports = {validateUser, validatePerson, validateSpecialty};