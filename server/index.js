var express = require("express");
var socket = require("socket.io");

var app = express();

var messageData = [];


var server = app.listen(4000, () => {
    console.log("listening to port 4000");
})

var io = socket(server);

io.on('connection', function(socket){
    console.log("made connection - ", socket.id);
    
    socket.emit('handshakeChat', messageData);
    
    socket.on('chat', function(data){
        messageData.push(data)
        io.sockets.emit('chat', data);
    });

    socket.on('typing' , ((data) =>{
        socket.broadcast.emit('typing', data);
    }))

    socket.on('disconnect', () => {
        console.log(socket.id, ' Disconnected!')
    })
})