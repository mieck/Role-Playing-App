const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Character =require('./Character.model.js');
const Spiel =require('./RPG.model.js');

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
    Characters :[{type:Schema.Types.ObjectId,ref:'Character'}],
    Spiels : [{type:Schema.Types.ObjectId, ref:'Spiel'}]
});

module.exports = mongoose.model('Spieler', SpielerSchema);