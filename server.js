const PORT = process.env.PORT || 8080;
const express = require('express');
//const socket = require('socket.io');
const app = express();

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(`${__dirname}/public/index.html`)
});

let server = app.listen(PORT, function(){
    console.log('Server started!!');
})

// Setup basic express server
const path = require('path');
//var server = require('http').createServer(app);
var io = require('socket.io')(server);

users = [];

io.on('connection', function(socket) {
    console.log('Host Id Connected: ', socket.id);

    socket.on('add user', (username) => {
        //if (addedUser) return;
        console.log(socket.id + ' username: ' + username);

        // we store the username in the socket session for this client
        socket.username = username;

        console.log(socket.username + " loged in.");
        socket.emit('loged in', {
            userName: socket.username
        });
    });

    socket.on('disconnect', (e) => {
        console.log('Host Id Disconnected: ' + socket.id);
    });

    socket.on('sent message', function(msg) {
        io.emit('sent message', {
            userName: socket.username,
            message: msg
        });
        console.log(socket.username + 'says: ' + msg);
    });
})

