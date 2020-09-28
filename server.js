const express = require ('express');
const server = express ();
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');

var corsOptions = {
  origin: 'http://localhost:8081',
};

//Middleware
server.use (cors (corsOptions));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: true}));

//Publico
server.use ('/static', express.static (__dirname + '/public'));

//Base de datos
const {database} = require ('./config/db.config');
const pool = require ('./db_connection/database');

//Ruta de ejemplo
server.get ('/', (req, res) => {
  res.json ({message: 'Bienvenidos a mi primera aplicación'});
});


//Juego
var game = require ('./routes/ticTacToe');
game (server);
var game = require ('./routes/hangman');
game (server);

//Autenticación
var auth = require ('./routes/authUsers');
auth (server);

//Servidor en puerto
const PORT = process.env.PORT || 8081;
server.listen (PORT, () => {
  console.log ('Servidor iniciado...');
});
