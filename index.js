require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );


// Rutas
app.use( '/usuarios', require('./routes/usuarios') );
app.use( '/hospitales', require('./routes/hospitales') );
app.use( '/medicos', require('./routes/medicos') );
app.use( '/todo', require('./routes/busquedas') );
app.use( '/login', require('./routes/auth') );
app.use( '/upload', require('./routes/uploads') );



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

