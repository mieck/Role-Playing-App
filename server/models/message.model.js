const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const spieler =require('./Spieler.model.js');
const MessageSchema = new Schema({
        message: {
            type: String,
            required: true
        },
        spieler: {
            type: String,
            required: true
        },
        likes:{
            type: Number,
            required: false
        },

        likedBy: []
    },
    {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

module.exports = mongoose.model('Message', MessageSchema);