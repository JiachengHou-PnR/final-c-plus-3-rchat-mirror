const PORT = process.env.PORT || 8080;

const express = require('express');
const socket = require('socket.io');
const app = express();

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendFile(`${__dirname}/public/index.html`)
});

let server = app.listen(PORT, function(){
    console.log('Server started!!');
})

let io = socket(server);

users = [];

io.on('connection', (socket) => {
    console.log('Host Id Connected: ', socket.id);
    let tempId = socket.id;

    socket.on('add user', (username) => {
        //if (addedUser) return;
        console.log(tempId + ' username: ' + username);

        // we store the username in the socket session for this client
        if (users.indexOf(username) > -1) {
            //socket.emit('userExists', username + ' username is taken! Try some other username.');
        } else {
            users.push(username);
            socket.username = username;
            console.log(socket.username + " loged in.");
            socket.emit('loged in', {
                userName: socket.username,
                numUsers: users.length
            });
        }
    });

    socket.on('disconnect', (e) => {
        console.log('Host Id Disconnected: ' + tempId);
    })


    socket.on('sent message', (msg) => {
        io.emit('sent message', {
            userName = socket.username,
            message: msg
        });
        console.log('message: ' + msg);
    })
})

