const Character = require('../models/Character.model');
const Spieler = require('./Spieler.controller');

exports.newCharacter = (req,res) =>{
        console.log("new character!");
        var newcharacter = {
            CharacterName: req.body.CharacterName,
            CharacterAlter: req.body.CharacterAlter,
            CharacterGeschlecht: req.body.CharacterGeschlecht,
            CharacterBeschreibung: req.body.CharacterBeschreibung,
            CharacterBild: req.body.CharacterBild,
        };

        var SpielerId = req.body.spielerId;


    var UpdatSpieler = Spieler.findWithId(SpielerId);

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


exports.update_character = (req,res) =>{
    //let spielerId = req.body.spielerId;
    console.log("update character!");
    var characterId = req.body.characterId;
    var new_value = {
        new_CharacterName:req.body.CharacterName,
        new_CharacterAlter:req.body.CharacterAlter,
        new_CharacterGeschlecht:req.body.CharacterGeschlecht,
        new_CharacterBeschreibung:req.body.CharacterBeschreibung,
        new_CharacterBild:req.body.CharacterBild,
    };

    Character.update({_id:req.body.characterId},  { $set: { field : new_value} })
        .then( character =>{
            res.status(200).send(character);
        }).catch(err =>{
        res.status(500).send(err.message);
    })
};
