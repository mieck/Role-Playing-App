const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Character =require('./Character.model.js');

const PostSchema = new Schema({
    character :{type:Schema.Types.ObjectId,ref:'Character'},
    text: {
        type:String,
        unique:false,
        required:true
    },
    // Bild : {data:Buffer,contentType: String} // deal with image https://gist.github.com/aheckmann/2408370

});

module.exports = mongoose.model('Post', PostSchema);