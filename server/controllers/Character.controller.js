//import {UPLOAD_PATH} from "../server";
//const UPLOAD_PATH = require('../config/ImageFolder.config.js');
const Character = require('../models/Character.model');
const Image = require('../models/image.model');
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
       filename :req.body.fileName,
       ImageUri:req.body.imagePath
   };

    Character.update({_id:req.body.characterId},  { $set: { CharacterBild : image} })
        .then( character =>{
            console.log("character success");
            res.status(200).send(character);
        }).catch(err =>{
            console.log("character bild problem");
            console.log(err.message);
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

exports.findImageCharacter = (req,res) =>{
    Character.findById(req.body.characterId)
        .then(char =>{
                Image.findById(char.CharacterBild)
                    .then(imag =>{
                        res.setRequestHeader('Content-Type', 'image/jpeg');
                        fs.createReadStream(path.join(UPLOAD_PATH, imag.filename)).pipe(res);
                    }).catch(err =>{
                        res.sendStatus(400);
                })
        }).catch(err =>{
           console.log(err);
    })
};

exports.uploadImage = (req,res) =>{

};


//#############################################################################################
// Interne
//###############################################################################################
exports.findWithId = (characterId)=>{
    Character.findById(characterId)
        .then(char =>{
            return(char);
        }).catch(err =>{
        return 0;
    })
};

exports.AddImageIdCharacter = (characterId, imgageId)=>{
    CharacterBild.findByIdAndUpdate(characterId,  { $set: { CharacterBild: imgageId }})
        .then( characterupdate =>{
            console.log("Spieler Update  Beim AddCharacterID");
            console.log(characterupdate);
            console.log(characterupdate.CharacterBild);
            //return Spieler;
        }).catch(err =>{
        console.log("Fehler Beim AddCharacterID");
        return err.message;
    })
};

exports.AddImageIdCharacterAvatar = (characterId, imgageId)=>{
    CharacterBild.findByIdAndUpdate(characterId,  { $push: { avatar: imgageId }})
        .then( characterupdate =>{
            console.log("Spieler Update  Beim AddCharacterID");
            console.log(characterupdate);
            console.log(characterupdate.CharacterBild);
            //return Spieler;
        }).catch(err =>{
        console.log("Fehler Beim AddCharacterID");
        return err.message;
    })
};

exports.deleteCharacter = (ID,res)=>{
    Character.findByIdAndRemove(ID)
        .catch(err => {
            return err.message;
        })
};
