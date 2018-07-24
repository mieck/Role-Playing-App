const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Character =require('./Character.model.js');

const SpielerSchema = new Schema ({
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
        unique:false
    },
    admin :{
        type:Boolean,
        required:false
    },
    Characters : [
        {
            type:Schema.Types.ObjectId,
            ref:'Character'
        }],
});

module.exports = mongoose.model('Spieler', SpielerSchema);