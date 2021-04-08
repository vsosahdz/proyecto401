var Conexion = require('tedious').Connection;
//Configuración del JSON para la conexión a la BD
var config = {
    //Nombre del equipo o la direccion IP (los equipos deben de estar en la misma red)
    server:'localhost',
    authentication: {
        type: 'default',
        options:{        
            userName: 'sa',
            password: 'Password1234$'
        }
    },
    options:{
        trustServerCertificate: true,
        database:'ejemplo',
        port: 1433
    }
};

var conexion = new Conexion(config);

conexion.on('connect', (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Conexión exitosa");
        ejecutarConsulta();
    }
});

//Llamar al evento connect
conexion.connect();


var Peticion = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function ejecutarConsulta(){
    peticion = new Peticion('SELECT * FROM Usuarios FOR JSON AUTO;',(err)=>{
        if(err){
            console.log(err);
        }
    });
    var result = "";  
    peticion.on('row', function(columns) {  
        columns.forEach(function(column) {  
            //console.log(column)
            if (column.value === null) {  
                console.log('NULL');  
            }else {  
                result+= column.value + " ";  
            }  
        });  
        console.log(JSON.parse(result));  
        result ="";  
    });  
  
    peticion.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
    });  
    
    conexion.execSql(peticion);
}
