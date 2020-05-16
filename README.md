# **R'Chat**

### **C Plus 3**

### Members

* Marco Alexi Sta Ana - msta001@ucr.edu
* Jiacheng Hou - jhou028@ucr.edu
* Chunho Wong - cwong161@ucr.edu

### Plan

We're planning on writing a web chatroom application that allows users that go on the site to anonymously chat with the current people within it!

### Why?

Since the ongoing pandemic (2020) has people locked inside their houses and with social distancing being a must. We decided to create a little application to get people chatting and having at least a little interaction with each other in these unsocial times.

### Language and Technology

* HTML/CSS
* Javascript
* JQuery
* Node
* React
* Heroku
* SQL

### Input/Output

* **Input**
  * Messages sent from users
  * Pictures sent from users
* **Output**
  * Messages received from users
  * Pictures received from users

### System Description and UML Diagrams

Our system is constructed by two parts, server side and client side. The sever side operates on our server, and the client side operates on the clients' computer. These two parts operate independently and shares information through the internet.

#### Server Side

The server receiving client's inputs and send the output back to the client side.

![Server Side UML Diagram](/diagrams/Server_Diagram.png)

| Class Name | Description  |
|---|---|
| ChatFactory | Grabbing the Chat from the client |
|  | Send to the class Chatroom |
| Chatroom (Server) | Grab new Chat from ChatFactory |
|  | Grab updated user number from NumberOfUsers |
|  | Send updated Chatroom to Client |
| NumberOfUsers | Get the users' information from Chatroom |
|  | Send the updated number of users back to Chatroom |

#### Client Side

The client side gets input from the user, send the chat message to the server and recieves updated chat information from the server and display it to the user.

![Client Side UML Diagram](/diagrams/Client_Diagram.png)

| Class Name | Description  |
|---|---|
| Chatroom (Client) | Display messages and number of users |
|          | Get ChatContainer from server side |
|  | Display it to the user |
| ChatContainer | Contains Chat classes |
|  | Send Chat Class to the server side |
| interface Chat | Abstract class the holds texts and username |
|  | Has two children: Text, Emoji |
| Text | Inherent class from Chat |
|  | Add basic text messages |
| Emoji | Inherent class from Chat |
|  | Add emoji messages |
| ChatDecorator | Abstract class that add features to Chat |
|  | Has two children: Color, GetEmoji|
| Color | Inherent class from ChatDecorator |
|  | Modifies Chat message color |
| GetEmoji | Inherent class from ChatDecorator |
|  | Convert Emoji from Unicode to picture |
