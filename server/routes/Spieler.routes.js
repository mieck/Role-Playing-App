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
    app.get('/settings', Spieler.findAll);
    app.post('/checkprofile', Spieler.findOnePlayer);
    app.post('/update_profile', Spieler.updateProfil);
    app.post('/register',Spieler.New_Spieler);
    app.post('/login',Spieler.login);

};