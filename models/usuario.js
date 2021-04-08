const Sequelize = require('sequelize');
//Traer un objeto sequelize
const sequelize = require("../util/database");
//Definicion del modelo
const Usuario = sequelize.define('usuario',{
    //Atributos de mi tabla
    usuarioUsuario: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    passwordUsuario: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Usuario;