const PostMessage = require('../models/Post.model');
const Character = require('./Character.controller');

exports.SavePost = (req,res)=>{
    var newspost = {
        text:req.body.text,
        character:req.body.character,
        name:req.body.name,
    };

    var post = new PostMessage(newspost);

    post.save()
        .then(post => {
            res.status(200).send(post);
        }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })

};

exports.ListPost = (req,res)=>{
    PostMessage.find()
        .then(Posts =>{
            res.send(Posts);
        }).catch(err =>{
        res.status(500).send({
            message:err.message
        })
    })
};

exports.GetALLPostsCharacterId = (req,res)=>{

};