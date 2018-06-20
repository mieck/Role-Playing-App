var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration connection
mongoose.connect('mongodb://localhost:27017/WAY');
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
var Spieler = require('./models/way_model');  // the schema are defined in this file way_model.js
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

app.get('/checkprofile', function(req, res, next){
    Spieler.find().then(function (user) {
        console.log(user);
        res.send(user)
    })
});

// player registration and login
app.post('/register',function (req,res,next) {
    console.log("register!");
    var items = {
        spielername :req.body.spielername,
        spielerpasswort : req.body.spielerpasswort,
        spieleremail : req.body.spieleremail,
    };
    console.log(items);
    var user = new Spieler(items);
    user.save(function (err) {
        if(err){
            console.log(err);
            return next("Nutzername existiert bereits.");
        }
        else{
            console.log("gut");
            return next("Sie sind registriert!");
        }
    });
});
app.post('/login',function(req,res,next) {
    console.log("login!");
    Spieler.findOne({"spielername": req.body.spielername}, function (err,user) {
        if(user == null){
            console.log("Ein Fehler ist aufgetreten.");
            //console(err);
            res.send({"message":"Nutzername existiert nicht!"});
        }else if (user.spielerpasswort == req.body.spielerpasswort){
            console.log("Perfekt.");
            console.log(user);
            res.send(user);

        }else {
            res.send({"message": "Falsches Passwort!"})
        }
    })

});


// Handeln Spielerscaracter
//**********************************************************************************************************
app.post('/new_character', function (req,res) {

   var newcharacter = {
       CharacterName:req.body.CharacterName,
           CharacterAlter:req.body.CharacterAlter,
    CharacterGeschlecht:req.body.CharacterGeschlecht,
        CharacterBeschreibung:req.body.CharacterBeschreibung,
       CharacterBild:req.body.CharacterBild,
   };
   console.log(req.body.spielerId);

   //Spieler.Spilercharaters.push(newcharacter);
   Spieler.findOneAndUpdate(
       { _id: req.body.spielerId },
       { $push: { characters: newcharacter } },
       function (error, success) {
           if (error) {
               console.log("fehler");
               console.log(error);
           } else {
               console.log("success");
               console.log(success);
           }
       });

});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Handeln Rpg Spiel
//**********************************************************************************************************
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
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// handeln postrpg
//*********************************************************************************************************
app.post('');
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


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