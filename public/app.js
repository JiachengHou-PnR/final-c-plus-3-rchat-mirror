$(document).ready(function () {
    var username;
    var socket = io();

    function setUsername() {
        username = prompt("Please enter a username", "Harry Potter");
    
        // If the username is valid
        if (username) {
          // Tell the server your username
          socket.emit('add user', username);
        }

        socket.on('loged in', (data) => {
            let text = 'Welcome ' + data.userName;
            addChatBubble(text, 'send');
            /*
            let addChatBubble;
            addChatBubble = '<div class="chatBubble send"><p class="chatMsg">' + "Welcome " + data.userName + '</p></div>'
            $('#inputLogs').append(addChatBubble);
            window.scrollTo(0, document.body.scrollHeight);
            */
        });
    }

    function EmitMessage() {
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
            let option;
            if (data.userName != username) {
                let addChatName = '<div class="chatName"><p>' + data.userName + '</p></div>';
                $('#inputLogs').append(addChatName);
                option = 'send';
            }
            else {
                option = 'receive';
            }
            
            addChatBubble(data.message, option);
            /*
            if (data.message != tempMsg) {
                addChatBubble = '<div class="chatBubble receive"><p class="chatMsg">' + data.message + '</p></div>';
            }
            else {
                addChatBubble = '<div class="chatBubble send"><p class="chatMsg">' + data.message + '</p></div>';
            }

            $('#inputLogs').append(addChatBubble);
            window.scrollTo(0, document.body.scrollHeight);
            */
        });
    }

    function addChatBubble(text, option) {
        let chatBubble = '<div class="chatBubble ' + option + '"><p class="chatMsg">' + text + '</p></div>';
        $('#inputLogs').append(chatBubble);
        window.scrollTo(0, document.body.scrollHeight);
    }

    setUsername();
    EmitMessage();

})