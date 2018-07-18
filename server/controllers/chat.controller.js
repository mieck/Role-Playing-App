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
      Chat.find().limit(100).sort({_id:1}).toArray()
          .then( msg =>{
              return msg;
      }).catch(err =>{
          console.log(err);
         return 0;
      })
};
exports.savemessage =(req,res) =>{
    const new_msg = {
        message:req.body.message,
        spieler:req.body.spieler,
    };

    const chat = new Chat(new_msg);
    chat.save()
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

    const chat = new Chat(new_msg);
    chat.save()
        .then(message => {
            return message;
        }).catch(err =>{
        console.log(err);
         return 0;
        console.log("Fehler");
         return err.message;
    })

};

