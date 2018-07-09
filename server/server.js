var cors = require('cors');
var express = require('express');
var app = express(); // new

var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbconfig = require('./config/mongodb.config');


// Please always use this line below to refer to the port
// that the server is supposed to listen to. tyvm
// by: marvinlwenzel
const port = 8080;

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

// Models
require('./routes/Character.routes.js')(app);
require('./routes/Post.routes.js')(app);
require('./routes/RPG.routes.js')(app);
require('./routes/Spieler.routes.js')(app);
require('./routes/image.routes')(app);

app.listen(port);
console.log("listening on port " + port);