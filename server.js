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
