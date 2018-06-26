const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterschema = new Schema({
    CharacterName :{
        type: String,
        unique:false,
        required:true
    },
    CharacterAlter:{
        type:Number,
        unique:false,
        required:false
    },
    CharacterGeschlecht :{
        type:String,
        unique:false,
        required:true
    },
    CharacterBeschreibung: {
        type:String,
        unique:false,
        required:true
    },
    CharacterBild : {
        data:Buffer,
        contentType: String},
});

module.exports = mongoose.model('Character', characterschema);