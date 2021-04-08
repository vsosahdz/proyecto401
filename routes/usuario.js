const express = require("express");
const router = express.Router();

router.get('/agregarUsuario',(req,res)=>{
    res.send("Hola");
})

router.post('/agregarUsuario',(req,res)=>{
    res.send("Hola");
})

router.get('/confirmacion',(req,res)=>{
    res.send("Usuario registrado con éxito");
})

router.get('/registros',(req,res)=>{
    res.send("Mostrar registros");
})

module.exports = router;
