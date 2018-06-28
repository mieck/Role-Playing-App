const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterschema = new Schema({
    CharacterName :{
        type: String,
        unique:false,
        required:true
    },
    CharacterAttributes: [{
        attr: String,
        value: String,
    }],
    CharacterBeschreibung: {
        type:String,
        unique:false,
        required:false
    },
    CharacterBild : {
        data:Buffer,
        contentType: String},
});

module.exports = mongoose.model('Character', characterschema);