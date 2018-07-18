exports = module.exports = function(client) {
    // Set socket.client listeners.
    const chatcontroller = require('./controllers/chat.controller');

    client.on('connection', (socket) => {
        console.log("even new connection !");
        // send status zu anderen Nutzern;
       sendStatus = function (s) {
           socket.emit('status',s);
       }
        // get all ältere message;
        const result = chatcontroller.getchats();
       if (result === 0){
           sendStatus('es gibt kein message');
       }
       else{
           socket.emit('refresh-messages', result );
       }

    });


    /*socket.on('new-message', (message) => {
        socket.join(message);
        console.log('joined ' + message);
    });*/

   /* socket.on('leave-message', (message) => {
        socket.leave(message);
        console.log('left ' + message);
    });*/
   // save one message
    socket.on('new-message', (message) => {
        console.log("even new message !");
        const result = chatcontroller.savemessageohne(message);
        console.log(result);
        if (result === 0){
            sendStatus('message wurde nicht gespeichert!');
        }else{
            //client.sockets.in(message).emit('refresh-messages', message);
            client.emit('refresh-messages', message)
        }

    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('clear',(message)=>{

    });
};