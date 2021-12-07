//CLIENT-SIDE

//activating the socket library
let clientSocket = io();

//running newConnection function
clientSocket.on("connect", newConnection);

//defining the newConnection function
function newConnection() {
  //printing the connections' ids
  console.log(clientSocket.id);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 20);
}
