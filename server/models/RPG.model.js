const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post =require('./Post.model.js');

const spielSchema = new Schema ({
    spieltitle: String,
    spielbeschreibung: String,
    PostID : [{type: Schema.Types.ObjectId,ref:'Post'}]
});

module.exports = mongoose.model('Spiel', spielSchema);
