const PostMessage = require('../models/Post.model');
const Spiel = require('./RPG.controller');

exports.SavePost = (req,res)=>{
    var newspost = {
        text:req.body.text,
        character:req.body.character,
        name:req.body.name,
        avatar:req.body.avatar,
        edited: req.body.edited,
    };

    var post = new PostMessage(newspost);

    post.save()
        .then(post => {
            Spiel.AddPostID(req.body.rpgid, post._id);
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

exports.findOnePost = (req,res)=>{
    PostMessage.findById(req.body.id)
        .then(Character =>{
            res.send(Character);
        }).catch(err =>{
        res.status(500).send({
            message: err.message
        })
    })
};

exports.EditPost = (req,res)=>{
    var updatedPost = {
        text:req.body.text,
        character:req.body.character,
        name:req.body.name,
        avatar:req.body.avatar,
        edited:req.body.edited,
    };

    PostMessage.findByIdAndUpdate({_id:req.body.postID,},  { $set: updatedPost })
        .then(post => {
            res.status(200).send(post);
        }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })

};