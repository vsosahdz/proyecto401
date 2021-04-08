//Configuracion de sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('aplicacion','sa','Password1234$',{
    dialect: 'mssql',
    dialectOptions:{
        options:{
            useUTC: false,
            dateFirst: 1
        }
    },
    define:{
        //Evitar que nos ponga createdAT y updatedAt
        timestamps: false,
        //Evitar que agregue una s al final
        freezeTableName: true
    }
});
//Exportando el objeto sequelize
module.exports = sequelize;


