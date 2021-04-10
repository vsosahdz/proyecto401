const express = require("express");
const router = express.Router();
const usuarioController = require('../controllers/usuario');

//Crear un usuario (CREATE)
//Enviar el recurso que contiene el formulario de usuario
router.get('/agregarUsuario',usuarioController.getAgregarUsuario);
//Recibe informacion y actualiza la base de datos
router.post('/agregarUsuario',usuarioController.postAgregarUsuario);
router.get('/confirmacion',usuarioController.getConfirmacion);

//Lectura (READ)
router.get('/registros',usuarioController.getRegistros);
router.get('/registro',usuarioController.getRegistro);

//Actualizar (UPDATE)
router.post('/actualizarUsuario',usuarioController.postActualizarUsuario);

//Borrar un usuario (DELETE)
router.post('/borrarUsuario/:usuarioUsuario',usuarioController.postBorrarUsuario);



module.exports = router;
