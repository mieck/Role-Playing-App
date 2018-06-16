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
var Spieler = require('./models/way_models');  // the schema are defined in this file way_models.js
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


app.post('/login',function(req,res,next) {
    console.log("login!");
    Spieler.findOne({"spielername": req.body.spielername}, function (err,user) {
        if(user == null){
            console.log("Fehler ist aufgetreten");
            //console(err);
            res.send({"message":"user not exit !"});
        }else if (user.spielerpasswort == req.body.spielerpasswort){
            console.log("gut getroffen!");
            console.log(user);
            res.send(user);

            }else {
                res.send({"message": "Wrong Password!"})
            }
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
            return next("username are already be used! ");
        }
        else{
            console.log("gut");
            return next("You are registered!");
        }
    });
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