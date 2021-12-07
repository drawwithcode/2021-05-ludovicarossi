//CLIENT-SIDE

//defining background variable
let myImage;

//preparing background image
function preload() {
  myImage = loadImage("./assets/stanza.png");
}

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
  stroke("black");
  line(data.px, data.py, data.x, data.y);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundImage(myImage);
}

function draw() {}

//background image function
function backgroundImage(img) {
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  let scale = Math.max(width / img.width, height / img.height);
  image(img, 0, 0, img.width * scale, img.height * scale);
  pop();
}

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
  stroke("black");
  line(pmouseX, pmouseY, mouseX, mouseY);
}
