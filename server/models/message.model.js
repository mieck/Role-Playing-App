const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const conversation =require('./conversation.model.js');
const spieler =require('./Spieler.model.js');
const MessageSchema = new Schema({
        conversationId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'conversation'
        },
        body: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'spieler'
        }
    },
    {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

module.exports = mongoose.model('Message', MessageSchema);