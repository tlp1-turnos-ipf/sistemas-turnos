//Llamamos los comandos de express
const express = require('express');
const app = express();

//Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//Seteamos urlencoded para capturar los datos del formulario para que no tengamos errores
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Estableciendo direcciones
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Establecer el motor de plantillas
app.set('view engine', 'ejs');

//Estableciendo las sesiones
const session = require('express-session');
app.use(session({
    secret: `secret`,
    resave: true,
    saveUninitialized: true
}))


//Direcciones
app.use('/', require('./routers/router'));


//Escuchamos el Puerto
app.listen(2500, ()=>{
    console.log("Corriendo en el servidor 2500");
})