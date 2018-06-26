module.exports = function (app) {

    var Character = require('../controllers/Character.controller.js');
    var Spieler = require('../controllers/Spieler.controller.js');

    app.post('/new_character', new_character);

//character Update
    app.post('/update_character' , function (req,res) {

        spielerId = req.body.spielerId;
        characterId = req.body.characterId;
        var character = {
            CharacterId: req.body.CharacterId,
            CharacterName:req.body.CharacterName,
            CharacterAlter:req.body.CharacterAlter,
            CharacterGeschlecht:req.body.CharacterGeschlecht,
            CharacterBeschreibung:req.body.CharacterBeschreibung,
            CharacterBild:req.body.CharacterBild,
        };
        Spieler.findOneAndUpdate({characters:characterId},
            {$set:{characters:character}},
            function (error,spieler) {
                if (error){
                    console.log("fehler");
                    console.log(error);
                }
                else {
                    console.log(sucess);
                }
            });

    });

};