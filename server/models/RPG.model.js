const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post =require('./Post.model.js');
const Spieler =require('./Spieler.model.js');

const spielSchema = new Schema ({
    spieltitle: {
        type:String,
        unique:false,
        required:true
    },
    spielgenre: {
        type:String,
        unique:false,
        required:true
    },
    spielbeschreibung: {
        type:String,
        unique:false,
        required:true
    },
    admin: {
        type: String,
        default: false,
        unique:false,
        required:true
    },
    PostID : [
        {
            type: Schema.Types.ObjectId,
            ref:'Post'
        }],
    Spieler : [
        {
            type:Schema.Types.ObjectId,
            ref:'Spieler'
        }]
});

module.exports = mongoose.model('Spiel', spielSchema);
