//Llamar los comandos de express
//Con esto invocamos a express
const express = require('express');
const app = express();

//Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//Seteamos urlencoded para capturar los datos del formulario para que no tengamos errores
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Esto permite que vaya desde el disco c para que cuando mudemos el codigo no sea necesario ir cambiando las direcciones
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Establecer el motor de plantillas
app.set('view engine', 'ejs');


//Direcciones
app.use('/', require('./routers/router'));

app.listen(2500, ()=>{
    console.log("Corriendo en el servidor 2500");
})