exports = module.exports = function (client) {
    // Set socket.io listeners.
    client.on('connection', (socket) => {
        // console.log('a user connected');

        // On conversation entry, join broadcast channel
        socket.on('new message', (conversation) => {
            socket.join(conversation);
            // console.log('joined ' + conversation);
        });

        socket.on('leave conversation', (conversation) => {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        });

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation).emit('refresh messages', conversation);
        });

        socket.on('disconnect', () => {
            // console.log('user disconnected');
        });
    });
};