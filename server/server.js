var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

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



app.listen(process.env.PORT || 8080);