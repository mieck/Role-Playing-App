const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Character =require('./Character.model.js');

const PostSchema = new Schema({
    text: {
        type:String,
        unique:false,
        required:true
    },
    character :{type:Schema.Types.ObjectId,ref:'Character'},

});

module.exports = mongoose.model('Post', PostSchema);