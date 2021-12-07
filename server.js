//SERVER-SIDE

//testing on terminal
console.log("up and running");

//loading express library into a variable
let express = require("express");

//running express library inside the application
let app = express();

//defining a port
let port = 3000;

//activating the application; variable containing the running instances of the server
let server = app.listen(port);

//checking
console.log("Server is running on http://localhost:" + port);

//using public folder to send (static) files
app.use(express.static("public"));

//introducing socket library
let serverSocket = require("socket.io");

//creating object for incoming&outcoming messages
let io = serverSocket(server);

//attaching code that will be executed when someone connects to the server
io.on("connection", newConnection);

//defining the newConnection function
//the object newSocket contains all the informations the socket library will pass
function newConnection(newSocket) {
  //printing the unique id of every client connection
  console.log(newSocket.id);
}
