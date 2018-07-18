module.exports = function (app) {
    var Chat = require('../controllers/chat.controller');



    /*// Send reply in conversation
    app.post('/conversationId', Chat.sendReply);

    // Start new conversation
    app.post('/new/recipient', Chat.newConversation);*/


    app.get('/chatmessage', Chat.getchatrequest);
    app.post('/chatmessage', Chat.getchats);

    app.post('/save_message', Chat.savemessageohne);
};