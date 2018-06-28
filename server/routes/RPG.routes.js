module.exports = function (app) {

    var Spiel = require('../controllers/RPG.controller');

    app.post('/new_spiel', Spiel.newSpiel);

    app.post('/update_spiel',Spiel.updateSpiel);

    app.get('/find_spiel', Spiel.findOneSpiel);

    app.get('/find_all', Spiel.findAll);

};