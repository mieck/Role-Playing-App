const Character = require('../models/Character.model');
const Spieler = require('./Spieler.controller');
const fs = require('fs');

exports.newCharacter = (req,res) =>{
        console.log("new character!");
        var newcharacter = {
            CharacterName: req.body.CharacterName,
            CharacterAttributes: req.body.CharacterAttributes,
            CharacterBeschreibung:req.body.CharacterBeschreibung,
            CharacterBild: req.body.CharacterBild,
        };
        var character = new Character(newcharacter);
        console.log("Spieler Id lesen");
        console.log(req.body);
        character.save()
            .then(new_character => {
                Spieler.AddCharacterId(req.body.spielerId,new_character._id);
                console.log(new_character);
                res.status(200).send(new_character);
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
        CharacterAttributes: req.body.CharacterAttributes,
        CharacterBeschreibung:req.body.CharacterBeschreibung,
    //     CharacterBild:{
    //         data :fs.readFileSync(req.body.Pathimage),
    //         contentType : req.body.ImageType,},
         };

    Character.findByIdAndUpdate({_id:req.body.characterId},  { $set: new_value })
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

exports.findOneCharacter = (req,res)=>{
    console.log(req.body.id);
    Character.findById(req.body.id)
        .then(Character =>{
            res.send(Character);
        }).catch(err =>{
        res.status(500).send({
            message: err.message
        })
    })
};
