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

//let usuariosBD=[];

//Middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Configuración de plantillas EJS
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');



app.use('/usuario',usuarioRoutes);

//Respuesta a método GET con un mensaje de texto
app.get('/',(req,res)=>{
    res.send("Hola que tal bienvenido");
});

//Respuesta a método GET con un segmento de una página web
app.get('/principal',(req,res)=>{
    res.send("<h1>Hola que tal bienvenido estas en principal</h1>");
});

//Respuesta a método GET con una página web
app.get('/main',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});
//__dirname la ruta contenedora del proyecto

//Respuesta a un método GET con un mensaje utilizando una ruta variable
app.get('/prueba/:usuario/:pais',(req,res)=>{
    //Leyendo la información que el usuario o su interacción envian en el URL
    res.send('<h1> Mira la consola </h1><br/><h2>'+req.params.usuario+'</h2>');
    console.log(`Hola ${req.params.pais} buen día`);
    console.log("Hola "+req.params.usuario+" buen día concatenado");
    console.log(req.params);

});


app.get('/prueba/:usuario',(req,res)=>{
    res.send('<h1> Mira la consola </h1><br/><h2>'+req.params.usuario+'</h2>');    
    console.log("Hola "+req.params.usuario+" buen día concatenado");
});

//GET envio de atributos-valor
app.get('/formulario',(req,res)=>{
    res.send('Mira la consola');
    console.log(req.query);
});

app.get('/formulario2',(req,res)=>{
    res.send('Petición recibida');
    console.log(req.body.password);
});

//POST con envio de datos JSON
app.post('/prueba3',(req,res)=>{
    console.log("Pase por prueba3");
    console.log(req.body);
    //Guarda la información de la petición en el arreglo usuariosDB
    //usuariosBD.push(req.body);

    //Guardar la información en la base de datos
    Usuario.create(req.body)
        .then(resultado=>console.log("Registro exitoso"))
        .catch(error=>console.log(error))

    console.log(req.body);
    res.redirect('/principal');
});

app.get('/registro',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','registro.html'));
});

app.get('/plantillaEJS',(req,res)=>{
    //Simular una consulta a la BD
    const consulta=[
        {usuarioUsuario:'Maria',passwordUsuario:"efewf",edad:18},
        {usuarioUsuario:'Pedro',passwordUsuario:"1234",edad:16},
        //{usuarioUsuario:'Laura',password:"#24",edad:19},
        //{usuarioUsuario:'Maria',password:"efewf",edad:18},
        //{usuarioUsuario:'Pedro',password:"1234",edad:16},
        //{usuarioUsuario:'Laura',password:"#24",edad:19}
    ];
    Usuario.findAll()
        .then(registros=>{
            var data=[];
            registros.forEach(registro=>{
                data.push(registro.dataValues)
            })
            console.log(data);
            res.render('ejemploEJS.html',{
                personas:data,
                sesion: "autorizada",
                fecha: 2021
            });
        })
        .catch(error=>console.log(error))
    
    
    
})


//console.log(path.join(__dirname,'views','index.html'))
//Atendiendo peticiones
sequelize.sync()
    .then(resultado=>{
        console.log("Conexion exitosa");
        app.listen(8080,()=>console.log("Servidor en línea en el puerto 8080"));
    })
    .catch(error=>console.log(error))
