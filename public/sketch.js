//CLIENT-SIDE

//activating the socket library
let clientSocket = io();

//running newConnection function when a new connection is made
clientSocket.on("connect", newConnection);

//defining the newConnection function
function newConnection() {
  //printing the connections' ids
  console.log(clientSocket.id);
}

//running newBroadcast function when receiving "mouse" message
clientSocket.on("mouseBroadcast", newBroadcast);

//defining newBroadcast function
function newBroadcast(data) {
  console.log(data);
  stroke("red");
  line(data.px, data.py, data.x, data.y);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {}

//sending to the server every mouse position
function mouseDragged() {
  //type of message to send
  let message = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY,
  };

  //sending the message, from client to server
  clientSocket.emit("mouse", message);
  stroke("yellow");
  line(pmouseX, pmouseY, mouseX, mouseY);
}
