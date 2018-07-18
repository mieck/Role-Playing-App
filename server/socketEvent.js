exports = module.exports = function(client) {
    // Set socket.client listeners.
    const chatcontroller = require('./controllers/chat.controller');
    const  SpielerController = require('./controllers/Spieler.controller');
    const Message = require('./models/message.model');
   /*client.on('connection', (socket) => {
        console.log("even new connection !");
        // send status zu anderen Nutzern;
       sendStatus = function (s) {
           socket.emit('status',s);
       }
        // get all ältere message;
        const result = chatcontroller.getchats();
       if (result == undefined){
           console.log("message  " + result);
           sendStatus('es gibt kein message');
       }
       else{
           socket.emit('refresh-messages', result );
       }

    });

   // save one message
    client.on('new-message', (message) => {
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

    client.on('disconnect', () => {
        console.log('user disconnected');
    });*/

    client.on('connection', (socket) => {
          console.log("even new connection !");
          // send status zu anderen Nutzern;
          sendStatus = function (s) {
            socket.emit('status',s);
        }
          // get all ältere message;

            Message.find().limit(100).sort({_id:1})
                .then( msg =>{
                    console.log("alle vorhandene Nachricten");
                    console.log(msg);
                    socket.emit('refresh-messages', msg );
                }).catch(err =>{
                console.log(err.message);
                sendStatus('es gibt kein message');

            });
            console.log("even new-message!");

            socket.on('new-message', (data) => {
             //const result = chatcontroller.savemessageohne(message);

                const new_msg = {
                    message:data.message,
                    spieler:data.spieler,
                };

                const new_message = new Message(new_msg);

                new_message.save()
                    .then(message => {
                        console.log("neue nachricht was gespeichert");
                        console.log(message);
                        client.emit('refresh-messages',data);
                    }).catch(err =>{
                    console.log(err.message);
                    sendStatus('es gibt kein message');

                });


             });

             socket.on('disconnect', () => {
             console.log('user disconnected');
             });
 });


};

