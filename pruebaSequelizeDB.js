const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebaDB401','sa','Password1234$',{
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

const Usuario = sequelize.define('usuarios',{
    //Atributos de mi tabla
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Producto = sequelize.define('producto',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    descripcion:{
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false
    }

});

const pruebaT= sequelize.define('pruebaTabla',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    libro:{
        type: Sequelize.STRING(55),
        allowNull:false
    }
})

sequelize.sync()
    .then((resultado)=>{
        console.log("Conexion exitosa");
        //INSERT INTO usuarios(nombre,edad) VALUES ('Laura',23);
        /*Usuario.create({
            nombre:'Laura',
            edad: 23
        }).then(resultado=>console.log("Registro exitoso"))*/

        //SELECT id,nombre,edad FROM usuarios;
        Usuario.findAll({attributes: ['id','nombre','edad']})
            .then(registros=>{
                registros.forEach(registro=>{
                    console.log(registro.dataValues);
                })
            })
            .catch(error=>console.log(error))
        
        

    })
    .catch(error=>console.log(error))

