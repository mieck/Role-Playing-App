module.exports = function (app) {
    var Chat = require('../controllers/chat.controller');

    app.get('/conversationId', Chat.getConversation);

    // Send reply in conversation
    app.post('/conversationId', Chat.sendReply);

    // Start new conversation
    app.post('/new/recipient', Chat.newConversation);



    app.post('/chatmessgae', Chat.getmsg);

    app.post('/save_chat', Chat.savemsg);
};