// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("../../dist"));

const port = 3500;
// Setup Server
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
//GET method route
app.get("/all", dataReturn);
function dataReturn(req, res) {
  console.log(projectData);
  res.send(projectData);
}

// post method route
app.post("/add", addDataEntry);

function addDataEntry(req, res) {
  console.log(req.body);
  let newData = req.body;
  let newEntry = {
    temperature: newData.temperature,
    date: newData.date,
    userResponse: newData.userResponse
  };
  projectData.push(newEntry);
}
