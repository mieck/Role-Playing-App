//Models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var character = new Schema({
        Name :{
            type: String,
            unique:false,
            required:true
        },
        Alter:{
            type:Number,
            unique:false,
            required:true
        },
        Geschlecht :{
            type:String,
            unique:false,
            required:true
        },
        Beschreibung: {
            type:String,
            unique:false,
            required:true
        },
        Bild : {
            data:Buffer,
            contentType: String}
});
var postrpg = new Schema({
    character :[character],
    text: {
        type:String,
        unique:false,
        required:true
    },
    Bild : {data:Buffer,contentType: String} // deal with image https://gist.github.com/aheckmann/2408370

});

var  spiel = new Schema ({
    PostID : [postrpg],
    spielname: String,
    genre: String,
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
    charaters :[character],
    Spiels : [spiel],
})

module.exports = mongoose.model('Waydb', spieler);