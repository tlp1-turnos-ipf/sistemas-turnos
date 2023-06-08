//Llamar los comandos de express
//Con esto invocamos a express
const express = require('express');
const app = express();

//Invocamos a dotenv
const dotenv = require('dotenv');
//Le decimos que vaya a la raiz del proyecto, busque la carpeta env, y que todas las variables a definir van a estar en env
dotenv.config({path:'./env/.env'});

//Seteamos urlencoded para capturar los datos del formulario para que no tengamos errores
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//setear el directorio de public
//Esto permite que vaya desde el disco c para que cuando mudemos el codigo no sea necesario ir cambiando las direcciones
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));



//Establecer el motor de plantillas
app.set('view engine', 'ejs');


app.get("/", (req, res)=>{
    res.render("index");
})


app.listen(2500, ()=>{
    console.log("Corriendo en el servidor 2500");
})