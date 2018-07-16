
const Image = require('../models/image.model');
const Character = require('./Character.controller');
const fs = require('fs');
const path = require('path');
const del = require('del');

exports.new_character_image = (req,res) =>{

    console.log(req.file);
    /*console.log("new Image!");
    var newImage = {
        filename: req.file.filename,
        //originalName: req.file.originalname,
        desc: req.body.mimeType,
    };
    var img = new Image(newImage);
    img.save()
        .then(new_image => {
            Character.AddImageIdCharacter(req.body.characterId,new_image._id);
            console.log(new_image);
            res.status(200).send(new_image);
        }).catch(err =>{
        console.log("fehler beim Insert Character!");
        res.status(500).send({
            message:err.message
        })
    })*/
};

exports.new_character_Avatar= (req,res) =>{
    console.log("new Image avatar!");
    var newImage = {
        filename: req.file.filename,
       // originalName: req.file.originalname,
        desc: req.body.mimeType,
    };
    var img = new Image(newImage);
    //console.log("Spieler Id lesen");
    //console.log(req.body);
    img.save()
        .then(new_image => {
            Character.AddImageIdCharacterAvatar(req.body.characterId,new_image._id);
            console.log(new_image);
            res.status(200).send(new_image);
        }).catch(err =>{
        console.log("fehler beim Insert Character!");
        res.status(500).send({
            message:err.message
        })
    })
};

exports.get_avatar_list = (req,res) =>{

};

