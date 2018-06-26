const PostMessage = require('../models/Post.model');
const Character = require('./Character.controller');

exports.SavePost = (req,res)=>{
    var newspost = {
        text:req.body.text,
        character:req.body.characterId,
    };



};

exports.ListPost = (req,res)=>{

};

exports.GetALLPostsCharacterId = (req,res)=>{

};