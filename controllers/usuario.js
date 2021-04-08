//Traer un modelo de usuario
const Usuario = require("../models/usuario");
const path = require("path");


exports.getAgregarUsuario = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','registro.html'));
};

exports.postAgregarUsuario = (req,res)=>{
    console.log(req.body);
    //Guardar la información en la base de datos
    Usuario.create(req.body)
        .then(resultado=>console.log("Registro exitoso"))
        .catch(error=>console.log(error))

    console.log(req.body);
    res.redirect('/usuario/confirmacion');
}  ;

exports.getConfirmacion = (req,res)=>{
    res.send("Usuario registrado con éxito");
};

exports.getRegistros = (req,res)=>{
    //SELECT * FROM usuario
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
    
};