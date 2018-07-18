const Message = require('../models/message.model');
const Spieler =require('../models/Spieler.model');


//var client = require('socket.io').listen(port).sockets;

/*

exports.getConversations = (req, res) =>{
    // Only return one message from each conversation to display as snippet
    Conversation.find({ participants: req.user._id })
        .select('_id')
        .exec((err, conversations) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            // Set up empty array to hold conversations + most recent message
            const fullConversations = [];
            conversations.forEach((conversation) => {
                Message.find({ conversationId: conversation._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: 'author',
                        select: 'profile.firstName profile.lastName'
                    })
                    .exec((err, message) => {
                        if (err) {
                            res.status(500).send({
                                message:err.message
                            })
                        }
                        fullConversations.push(message);
                        if (fullConversations.length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    });
            });
        });
};

/!*exports.getMessage = (req, res)=> {
    Message.find({ conversationId: req.params.conversationId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
        })
        .exec((err, messages) => {
            if (err) {
                res.send({ error: err.message });
            }

            return res.status(200).json({ conversation: messages });
        });
};*!/

exports.newConversation = (req, res)=> {
    if (!req.params.recipient) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });

    }

    if (!req.body.composedMessage) {
        res.status(422).send({ error: 'Please enter a message.' });

    }

    const conversation = new Conversation({
        participants: [req.user._id, req.params.recipient]
    });

    conversation.save((err, newConversation) => {
        if (err) {
            res.send({ error: err.message });
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.composedMessage,
            author: req.user._id
        });

        message.save((err, newMessage) => {
            if (err) {
                res.send({ error: err.message });

            }

            return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
        });
    });
};
*/

exports.sendReply = (req, res)=> {
    const reply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.user._id
    });

    reply.save((err, sentReply) => {
        if (err) {
            res.send({error: err.message});

        }

        return res.status(200).json({message: 'Reply successfully sent!'});
    });
};


exports.getchats = () =>{
    console.log("get chats message");
    Message.find().limit(100).sort({_id:1})
          .then( msg =>{
              //console.log(msg);
              return msg;
      }).catch(err =>{
          console.log(err.message);
         return null;
      })
};


exports.getchatrequest = (req,res) =>{
    console.log("get chats message");
    Message.find().limit(100).sort({_id:1})
        .then( msg =>{
            res.status(200).send(msg);
        }).catch(err =>{
        console.log(err);
        res.status(500).send(null);
    })
};
exports.savemessage =(req,res) =>{
    const new_msg = {
        message:req.body.message,
        spieler:req.body.spieler,
    };

    const new_message = new Message(new_msg);
    new_message.save()
        .then(message => {
            res.status(200).send(message);
        }).catch(err =>{
        console.log("fehler beim Insert Character!");
        res.status(500).send({
            message:err.message
        })
    })

};

exports.savemessageohne =(data) =>{
    const new_msg = {
        message:data.message,
        spieler:data.spieler,
    };

    const new_message = new Message(new_msg);

    new_message.save()
        .then(message => {
            return message;
        }).catch(err =>{
        console.log(err);
        console.log("Fehler beim Speichern ");
        return null;
    })

};

