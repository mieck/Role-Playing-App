var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration connection
mongoose.connect('mongodb://localhost:27017/waydb');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

const app = require('express')();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'DELETE', 'PUT');
    response.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Spieler = require('./models/way_models'); //server/models/way_models.js
//___________________________________________________________________________________



app.post('/checkname', function(req, res){

    if(req.body.name.toLowerCase() === 'homer'){

        res.status(401).send({message: 'Sorry, no Homer\'s!'});

    } else {

        res.send({
            passed: true,
            message: 'Welcome, friend!'
        });

    }

});

app.get('/checkname/:name', function(req, res){

    if(req.params.name.toLowerCase() === 'homer'){

        res.status(401).send({message: 'Sorry, no Homer\'s!'});

    } else {

        res.json('Welcome!');

    }
});
app.get('/', function (req,res) {
    res.send('gut');
});

// player registration and login

app.post('/way/login',function (req,res) {
    if (!req.body.spielername || !req.body.spielerpasswort){
        res.json({succes: false, msg: 'Please give the name and password'});
    }
    else {

        res.json({succes: true, msg: 'successfuly loggin!'});

    }
});


app.post('/way/singup', function (req,res) {
    if (!req.body.spielername || !req.body.spielerpasswort || !req.body.spieleremail){
        res.json({succes: false, msg: 'Please give the name or password or email was empty!'});
    }
    else {
        //create Spieler
         var newSpieler = Spieler({
             spielername: req.body.spielername,
             spielerpasswort: req.body.spielerpasswort,
             spieleremail: req.body.spieleremail
         });
        spieler.insert(newSpieler, function (err,result) {
             if (err){
                 console.log(err);
                 res.json({succes: false, msg: 'error during creation!' + err});
             }
             else{
                 console.log(result);
                 res.json({succes: true, msg: 'creation' + result});
             }
         });

    }
});
// create Spieler

app.post('/way/new_spieler', function (req,res) {
   spieler.create({
       spielerId: "Rpg2015", //
       spielername : req.body.spielername,
       spielerpasswort : req.body.spielerpasswort,
       spieleremail : req.body.spieleremail,
       admin: false
       //spielercharacterName: req.body.spielercharacterName,

   },function (err, spieler) {
       if (err)
           res.send(err);

       // redirect to create character ......
       console.log("character hinzugefügt!");
   });
});

app.listen(process.env.PORT || 8080);
console.log("listening on port 8080");