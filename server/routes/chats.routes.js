module.exports = function (app) {
    var Chat = require('../controllers/chat.controller');

    chatRoutes.get('/conversationId', ChatController.getConversation);

    // Send reply in conversation
    chatRoutes.post('/conversationId', ChatController.sendReply);

    // Start new conversation
    chatRoutes.post('/new/recipient', ChatController.newConversation);



    app.post('/chatmessgae', Chat.getmsg);

    app.post('/save_chat', Chat.savemsg);
};