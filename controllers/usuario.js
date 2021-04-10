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

exports.getRegistro = (req,res)=>{
    //SELECT * FROM usuario WHERE
    console.log(req.query)
    //Usuario.findByPk(req.query.usuarioUsuario) //1.- Haciendo en select con la llave primaria
    Usuario.findAll({
        where:{
            usuarioUsuario:req.query.usuarioUsuario
        }
    })
        .then(result=>{
            res.send(result);
        })
        .catch(error=>{
            console.log(error)
            res.send(error);
        })

};

exports.postBorrarUsuario =(req,res)=>{
    console.log(req.params);
    Usuario.findByPk(req.params.usuarioUsuario)
        .then(usuario=>{
            return usuario && usuario.destroy(); //DELETE
        })
        .then(resultado=>{
            console.log("Usuario eliminado correctamente")
            console.log(resultado)
            res.redirect('/usuario/confirmacion');
        })
        .catch(error=>console.log(error))
}

exports.postActualizarUsuario =(req,res)=>{
    console.log(req.body);
    Usuario.findByPk(req.body.usuarioUsuario)
        .then(usuario=>{
            usuario.passwordUsuario=req.body.passwordUsuario;
            return usuario && usuario.save(); //UPDATE
        })
        .then(resultado=>{
            console.log("Usuario actualizado correctamente")
            console.log(resultado)
            res.redirect('/usuario/confirmacion');
        })
        .catch(error=>console.log(error))
}
