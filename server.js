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
io.on('connection', function(socket){
    console.log('Host Id Connected: ', socket.id);
    let tempId = socket.id;

/*
    socket.on('set username', function(usr) {
        console.log(usr);
        console.log(tempId + ' username: ' + usr);

        if(users.indexOf(usr) > -1) {
            socket.emit('userExists', usr + ' username is taken! Try some other username.');
         } else {
            users.push(usr);
            socket.emit('userSet', {username: usr});
         }
    })
*/

    socket.on('disconnect', (e) => {
        console.log('Host Id Disconnected: ', tempId);
    })
});


io.on('connection', function(socket) {
    socket.on('sent message', (msg) => {
        io.emit('sent message', msg)
        console.log('message: ' + msg);
    })
})

