//Models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var character = new Schema({
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
    CharacterBild : [{
        data:Buffer,
        contentType: String}]
});

var postrpg = new Schema({
    character :[character],
    text: {
        type:String,
        unique:false,
        required:true
    },
    // Bild : {data:Buffer,contentType: String} // deal with image https://gist.github.com/aheckmann/2408370

});

var  spiel = new Schema ({
    PostID : [postrpg],
    spieltitle: String,
    //genre: String,
    spielbeschreibung: String,

});


var spieler = new Schema ({
    spielername : {
        type:String,
        unique:true,
        required:true
    },
    spielerpasswort : {
        type:String,
        unique:false,
        required:true
    },
    spieleremail : {
        type:String,
        unique:false,
        required:true
    },
    admin :{
        type:Boolean,
        required:false
    },
    Spilercharaters :[character],
    SpielerSpiels : [spiel],
});

module.exports = mongoose.model('Waydb', spieler);
