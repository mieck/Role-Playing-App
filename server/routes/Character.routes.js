
module.exports = function (app) {
    var Character = require('../controllers/Character.controller');
     app.post('/new_character', Character.newCharacter);

//character Update
    app.post('/update_character', Character.update_character);

    app.post('/find_character', Character.findOneCharacter);

    app.post('/uploadImage', Character.updateAddBild);

    app.post('/uploadAvatar', Character.updateAddAvatar);

};