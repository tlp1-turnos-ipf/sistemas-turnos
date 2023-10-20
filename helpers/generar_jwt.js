const jwt = require("jsonwebtoken");

const generarJWT = (payload) => {
  return new Promise((resolve, reject) => {
    // Se firma el token
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el JWT");
        }
        resolve({ token });
      }
    );
  });
};

module.exports = {
  generarJWT,
};
