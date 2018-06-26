module.exports = function (app) {

    var Spieler = require('../controllers/Spieler.controller');

    /*app.post('/checkname', function(req, res){

        if(req.body.name.toLowerCase() === 'homer'){

            res.status(401).send({message: 'Sorry, no Homer\'s!'});

        } else {

            res.send({
                passed: true,
                message: 'Welcome, friend!'
            });

        }

    });*/
    app.get('/checkprofile', Spieler.findAll);
    app.post('/register',Spieler.New_Spieler);
    app.post('/login',Spieler.login);

};