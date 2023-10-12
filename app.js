// Importaciones de librerías
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser")

// El método config de dotenv permite leer variables de entorno desde un archivo .env
require("dotenv").config();

// Si no existe el archivo .env, el valor por defecto del puerto será 6000
const port = process.env.PORT;

// Se inicializa express para poder usar sus métodos
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())

// Archivos estáticos utilizando la librería path que viene en NodeJS
app.use(express.static(path.join(__dirname, "public")));

// Configuración de motor de plantillas EJS
app.set("view engine", "ejs");

//Se conecta la BD
const { conectarDB } = require("./conection/db");
conectarDB();

app.use(require("./routers/routes"));

// 404 - Not found
app.use((req, res, next) => {
  res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/';
           }, 3000)           
        )();
        </script>
    </h1>`);
});

// Servidor en escucha de peticiones
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));
