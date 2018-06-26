var express = require('express');
var app = express(); // new

var bodyParser = require('body-parser');
const mongoose = require('mongoose');

/*var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors'); */

// Configuration connection

/*mongoose.connect('mongodb://localhost:27017/WAY');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));*/

const dbconfig = require('./config/mongodb.config');

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

//db.on('error', console.error.bind(console, "MongoDB connection error"));

//const app = require('express')();
/*app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));*/
app.use(bodyParser.json());
/*app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());*/

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'DELETE', 'PUT');
    response.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
//var Spieler = require('./models/way_model');  // the schema are defined in this file way_model.js
require('./routes/Character.routes.js')(app);
require('./routes/Post.routes.js')(app);
require('./routes/RPG.routes.js')(app);
require('./routes/Spieler.routes.js')(app);

// Handeln Rpg Spiel
//!**********************************************************************************************************
app.post('/new_spiel', function (req,res) {

    var newspiel = {
        spieltitle:req.body.spieltitle,
        spielbeschreibung:req.body.spielbeschreibung,
    };

    //Spieler.Spilercharaters.push(newcharacter);
    Spieler.findOneAndUpdate(
        { _id: req.body.spielerId },
        { $push: { SpielerSpiels: newspiel } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });

});

app.post('/update_spiel',function (req,res) {
    spielerId = req.body.spielerId;
    spielId = req.body.spielId;
    var Spiel = {
        newspieltitle:req.body.spieltitle,
        newspielbeschreibung:req.body.spielbeschreibung,
    };
    Spieler.findOneAndUpdate({Spiels:spielId},
        {$set:{Spiels:Spiel}},
        function (error,Spiel) {
            if (error){
                console.log("fehler");
                console.log(error);
            }
            else {
                console.log(Spiel);
            }
        });

});
app.listen(process.env.PORT || 8080);
console.log("listening on port 8080");