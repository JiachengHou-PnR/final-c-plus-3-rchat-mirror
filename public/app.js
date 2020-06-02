$(document).ready(function () {
    var username;

    function EmitMessage() {

        var socket = io();
        let tempMsg;

        $('form').submit(function () {
            tempMsg = $('#msgForm').val();
            if (tempMsg == "") {
                alert("Message cannot be empty.");
            }
            else {
                socket.emit('sent message', $('#msgForm').val());
                $('#msgForm').val('');
            }
            return false;
        });

        socket.on('sent message', (data) => {
            let addChatName;
            addChatName = '<div class="chatName"><p>' + data.userName + '</p></div>';
            $('#inputLogs').append(addChatName);
            
            let addChatBubble;
            if (data.message != tempMsg) {
                addChatBubble = '<div class="chatBubble receive"><p class="chatMsg">' + data.message + '</p></div>';
            }
            else {
                addChatBubble = '<div class="chatBubble send"><p class="chatMsg">' + data.message + '</p></div>';
            }

            $('#inputLogs').append(addChatBubble);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    function setUsername() {
        var socket = io();
        username = prompt("Please enter a username", "Harry Potter");
    
        // If the username is valid
        if (username) {
          // Tell the server your username
          socket.emit('add user', username);
        }

        socket.on('loged in', (data) => {
            let addChatBubble;
            addChatBubble = '<div class="chatBubble send"><p class="chatMsg">' + "Welcome " + data.userName + '</p></div>'
            $('#inputLogs').append(addChatBubble);
        });
    }




    EmitMessage()
    setUsername();
})