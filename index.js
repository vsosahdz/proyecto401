//Biblioteca para crear rutas absolutas o relativas de los recursos de la aplicación
const path = require('path'); 
//Biblioteca manejo de JSON
const bodyParser = require('body-parser');
//Importando la biblioteca express para la creación de servidores
const express = require('express');
//Traer un objeto sequelize
const sequelize = require("./util/database");
//Traer un modelo
const Usuario = require("./models/usuario");
//Traer rutas
const usuarioRoutes = require("./routes/usuario")
//Crear el servidor
const app = express();
//Middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Configuración de plantillas EJS
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

app.use('/usuario',usuarioRoutes);

sequelize.sync()
    .then(resultado=>{
        console.log("Conexion exitosa");
        app.listen(8080,()=>console.log("Servidor en línea en el puerto 8080"));
    })
    .catch(error=>console.log(error))
