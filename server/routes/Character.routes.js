module.exports = function (app) {

    var Character = require('../controllers/Character.controller.js');
    var Spieler = require('../controllers/Spieler.controller.js');

    app.post('/new_character', new_character);

//character Update
    app.post('/update_character',update_character);

};