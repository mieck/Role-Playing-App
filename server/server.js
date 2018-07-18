var cors = require('cors');
var express = require('express');
var app = express(); // new
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
socketEvents = require('./socketEvent');
// let http = require('http').Server(app);


const dbconfig = require('./config/mongodb.config');


// Please always use this line below to refer to the port
// that the server is supposed to listen to. tyvm
// by: marvinlwenzel
const port = 8080;
const portsocket = 8085;

// socket client initialisation port
//var client = require('socket.io').listen(port).sockets;
try {
    client = require('socket.io').listen(portsocket);
    socketEvents(client);
}catch (e) {
    console.log("socket io couldn't connect on port 8080");
    console.log(e.message);
}


//mongoose.connect('mongodb://localhost:27017/WAY');
mongoose.Promise = global.Promise;
//var db = mongoose.connection;
mongoose.connect(dbconfig.url)
    .then(()=>{
        console.log("Successfully connected to MongoDB!");
    }).catch(err =>{
    console.log('Could not connect to MongoDB.');
    process.exit();
});

app.use(cors());
app.use(bodyParser.json());
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'DELETE', 'PUT');
    response.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/public', express.static(process.cwd() + '/public'));

// Models
require('./routes/Character.routes.js')(app);
require('./routes/Post.routes.js')(app);
require('./routes/RPG.routes.js')(app);
require('./routes/Spieler.routes.js')(app);
require('./routes/image.routes')(app);
require('./routes/chats.routes')(app);

//Chat Funktion
// io.on('connection', (socket) => {
//
//     socket.on('disconnect', function(){
//         io.emit('users-changed', {user: socket.nickname, event: 'left'});
//     });
//
//     socket.on('set-nickname', (nickname) => {
//         socket.nickname = nickname;
//         io.emit('users-changed', {user: nickname, event: 'joined'});
//     });
//
//     socket.on('add-message', (message) => {
//         io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
//     });
// });

app.listen(port);
console.log("listening on port " + port);