const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const spieler =require('./Spieler.model.js');
const Conversationschema = new Schema({
    Teilnahmer : [{type:Schema.Types.ObjectId,ref:'spieler' }]
});

module.exports = mongoose.model('Conversation', Conversationschema);