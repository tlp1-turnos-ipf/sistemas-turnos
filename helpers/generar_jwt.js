const jwt = require("jsonwebtoken");

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

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
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
