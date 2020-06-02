$(document).ready(function () {

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

        socket.on('sent message', function (e) {
            let addChatBubble;
            if (e != tempMsg) {
                addChatBubble = '<div class="chatBubble receive"><p class="chatMsg">' + e + '</p></div>'
            }
            else {
                addChatBubble = '<div class="chatBubble send"><p class="chatMsg">' + e + '</p></div>'
            }

            $('#inputLogs').append(addChatBubble);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    EmitMessage();

    function setUsername() {
        var socket = io();
        let username = prompt("Please enter a username", "Harry Potter");
    
        // If the username is valid
        if (username) {
          // Tell the server your username
          socket.emit('add user', username);
        }
      }

    setUsername();
})