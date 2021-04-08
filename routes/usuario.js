const express = require("express");
const router = express.Router();
const usuarioController = require('../controllers/usuario');

router.get('/agregarUsuario',usuarioController.getAgregarUsuario);
router.post('/agregarUsuario',usuarioController.postAgregarUsuario);
router.get('/confirmacion',usuarioController.getConfirmacion);
router.get('/registros',usuarioController.getRegistros);

module.exports = router;
