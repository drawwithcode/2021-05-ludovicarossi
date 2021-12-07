//CLIENT-SIDE
//creating empty array to keep track of lines
let lines = [];

//creating variables
let penColor;
let penThickness;
let clearButton;

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
  drawLine(data.px, data.py, data.x, data.y, data.color, data.thickness);
}

function setup() {
  createCanvas(windowWidth, windowHeight - 80);
  backgroundImage(myImage);

  //line options to choose from
  //creating div element for options
  //organizing titles with style method (plain CSS)
  let options = createDiv().style("display: flex");
  //creating div elements for titles and values. options-div is parent of both
  let optionsTitles = createDiv().parent(options);
  //creating titles as <p> elements
  createP("Pen color").parent(optionsTitles);
  createP("Pen thickness").parent(optionsTitles);

  //organizing values with style method (plain CSS)
  let optionsValues = createDiv()
    .parent(options)
    .style("margin:10px 50px; width: 40px");
  //adding values
  penColor = createColorPicker("#000000").parent(optionsValues);
  //using a select element for pen thickness (drop-down menu, only 1 option to choose)
  penThickness = createSelect(false)
    .parent(optionsValues)
    .style("margin-top:10px");
  //declaring options of the list
  penThickness.option("1");
  penThickness.option("3");
  penThickness.option("5");
  penThickness.option("7");
  //setting the default value
  penThickness.selected("1");
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
    color: penColor.value(),
    thickness: penThickness.value(),
  };

  //sending the message, from client to server
  clientSocket.emit("mouse", message);
  drawLine(
    pmouseX,
    pmouseY,
    mouseX,
    mouseY,
    penColor.value(),
    penThickness.value()
  );
}

function drawLine(px, py, x, y, color, thickness) {
  stroke(color);
  strokeWeight(thickness);
  line(px, py, x, y);
}
