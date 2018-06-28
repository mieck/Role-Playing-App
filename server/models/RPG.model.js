const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post =require('./Post.model.js');

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
        unique:false,
        required:true
    },
    PostID : [{type: Schema.Types.ObjectId,ref:'Post'}]
});

module.exports = mongoose.model('Spiel', spielSchema);
