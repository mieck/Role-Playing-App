const Character = require('../models/Character.model');
const Spieler = require('./Spieler.controller.js');
module.exports = function (app) {

exports.new_charcter = (req,res) =>{
    let newcharacter = {
        CharacterName: req.body.CharacterName,
        CharacterAlter: req.body.CharacterAlter,
        CharacterGeschlecht: req.body.CharacterGeschlecht,
        CharacterBeschreibung: req.body.CharacterBeschreibung,
        CharacterBild: req.body.CharacterBild,
    };
    let SpielerId = req.body.spielerId;

    let UpdatSpieler = Spieler.findWithId(SpielerId);

    if (isNullOrUndefined(UpdatSpieler)){
        //res.send()
        console.log("spielr findwithID hat ein Problem!");
    }
    else {
        var character = new Character(newcharacter);
        character.save()
            .then(new_character => {
                result = Spieler.AddCharacterId(UpdatSpieler._id,new_character._id)
                if (isNullOrUndefined(result._id)){
                    console.log("fehler beim Update Spieler Character!");
                }
                else {
                    res.status(200).send(result);
                }
            }).catch(err =>{
            console.log("fehler beim Insert Character!");
            res.status(500).send({
                message:err.message
            })
        })
    }
};

};