const Character = require('../models/Character.model');
const Spieler = require('./Spieler.controller');
const fs = require('fs');

exports.newCharacter = (req,res) =>{
        console.log("new character!");
        var newcharacter = {
            CharacterName: req.body.CharacterName,
            CharacterAlter: req.body.CharacterAlter,
            CharacterGeschlecht: req.body.CharacterGeschlecht,
            CharacterBeschreibung: req.body.CharacterBeschreibung,
            CharacterBild: req.body.CharacterBild,
        };
        var character = new Character(newcharacter);
        console.log("Spieler Id lesen");
        console.log(req.body.spielerId);
        character.save()
            .then(new_character => {
                result = Spieler.AddCharacterId(req.body.spielerId,new_character._id);
                if (result._id == null){
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
};


exports.update_character = (req,res) =>{
    //let spielerId = req.body.spielerId;
    console.log("update character!");
    var characterId = req.body.characterId;
    var new_value = {
        CharacterName:req.body.CharacterName,
        CharacterAlter:req.body.CharacterAlter,
        CharacterGeschlecht:req.body.CharacterGeschlecht,
        CharacterBeschreibung:req.body.CharacterBeschreibung,
        CharacterBild:{
            data :fs.readFileSync(req.body.Pathimage),
            contentType : req.body.ImageType,},
    };

    Character.update({_id:req.body.characterId},  { $set: { field : new_value} })
        .then( character =>{
            res.status(200).send(character);
        }).catch(err =>{
        res.status(500).send(err.message);
    })
};

exports.updateAddBild = (req,res) =>{
    // Bild : {data:Buffer,contentType: String} // deal with image https://gist.github.com/aheckmann/2408370
   var image ={
       imagePath :req.body.imagePath,
       imageType : req.body.ImageType
   };

    Character.update({_id:req.body.characterId},  { $set: { CharacterBild : image} })
        .then( character =>{
            res.status(200).send(character);
        }).catch(err =>{
        res.status(500).send(err.message);
    })

};
