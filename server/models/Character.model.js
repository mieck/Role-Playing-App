const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const image =require('./image.model.js');

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
        type:String,
        unique: false,
        required: false
    },
    avatar :[{type:Schema.Types.ObjectId,ref:'image'}],
});

module.exports = mongoose.model('Character', characterschema);