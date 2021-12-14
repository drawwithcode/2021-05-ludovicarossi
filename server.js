//SERVER-SIDE

//testing on terminal
console.log("up and running");

//express

//loading express library into a variable
let express = require("express");

//running express library inside the application
let app = express();

//defining a port
let port = process.env.PORT || 3000;

//activating the application; variable containing the running instances of the server
let server = app.listen(port);

//checking
console.log("Server is running on http://localhost:" + port);

//using public folder to send (static) files
app.use(express.static("public"));

//socket

//loading socket library into a variable
let serverSocket = require("socket.io");

//creating object for incoming & outcoming messages
//activating socket library and running it on the server
let io = serverSocket(server);

//running newConnection function when a new connection is made
io.on("connection", newConnection);

//defining the newConnection function
//the object newSocket contains all the informations the socket library will pass
function newConnection(newSocket) {
  //printing the unique id of every client connection
  console.log(newSocket.id);

  //running mouseMessage function when receiving the "mouse" message
  newSocket.on("mouse", mouseMessage);

  //defining the mouseMessage function
  function mouseMessage(dataReceived) {
    console.log(dataReceived);

    //sending "mouse" message to all the other clients
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
