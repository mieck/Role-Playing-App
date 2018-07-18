exports = module.exports = function(client) {
    // Set socket.client listeners.
    const chatcontroller = require('./controllers/chat.controller');
    client.on('connectclientn', (socket) => {
        // console.log('a user connected');

        // On message entry, join broadcast channel
        socket.on('new-message', (message) => {
            socket.join(message);
            console.log('joined ' + message);
        });

        socket.on('leave-message', (message) => {
            socket.leave(message);
            console.log('left ' + message);
        });

        socket.on('new-message', (message) => {
            const result = chatcontroller.savemessageohne(message);
            console.log(result);
            client.sockets.in(message).emit('refresh-messages', message);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};