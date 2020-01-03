// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const request = require("request");

/* Dependencies */
const bodyParser = require("body-parser");
const dotenv     = require("dotenv");
dotenv.config();
var path = require("path");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup empty JS object to act as endpoint for all routes
var temperatureData = [];
var imageData       = [];
var projectData     = [];

//Test GET method route
app.get("/test", function(req, res) {
  res.send({title:"testing"});
});


//GET method route
app.get("/all", dataReturn);
function dataReturn(req, res) {
  let newEntry;
  if(temperatureData.length == 0 && imageData.length !=0){
    newEntry = {
      imageLink  : imageData[imageData.length - 1].imageURL
  }
}
else if(temperatureData.length != 0 && imageData.length ==0){
  newEntry = {
    temperature: temperatureData[temperatureData.length - 1].temperature,
  }
} else if(temperatureData.length !=0 && imageData.length !=0 ) {
  newEntry = {
    temperature: temperatureData[temperatureData.length - 1].temperature,
    imageLink  : imageData[imageData.length - 1].imageURL
  }
}
  projectData.push(newEntry);
  res.send(projectData);
  temperatureData.length = 0;
  imageData.length = 0;
  projectData.length = 0;
}

// post method route
app.post("/add", addDataEntry);

function addDataEntry(req, res) {
  console.log(req.body);
  let newData = req.body;
  let newEntry = {
    temperature: newData.temperature,
    date: newData.date,
  };
  projectData.push(newEntry);
}

//Method to issue feth to darkSky API
const darkSkyBaseUrl = "https://api.darksky.net/forecast/";
const darkSkyApiKey = process.env.DARK_SKY_API_KEY ;

app.post("/fetchtemperaturecurrent", fetchTemperature);
app.post("/fetchtemperaturepredict", fetchTemperaturePredicted);
//Fetch call
function fetchTemperature(req, res) {
  var fullUrl =
    darkSkyBaseUrl +
    darkSkyApiKey +
    "/" +
    req.body.latitude +
    "," +
    req.body.longitude;
  request({ url: fullUrl }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: response.error });
    }
    let newData = JSON.parse(body);
     let newEntry ={
       temperature: newData.currently.temperature,
       date       : newData.currently.time
     };
    temperatureData.push(newEntry);
    res.json(JSON.parse(body));
  });
}

function fetchTemperaturePredicted(req, res) {
  var fullUrl =
    darkSkyBaseUrl +
    darkSkyApiKey +
    "/" +
    req.body.latitude +
    "," +
    req.body.longitude +
    "," +
    req.body.time;
  request({ url: fullUrl }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: response.error });
    }
    let newData = JSON.parse(body);
     let newEntry ={
       temperature: newData.currently.temperature,
       date       : newData.currently.time
     };
    temperatureData.push(newEntry);
    res.json(JSON.parse(body));
  });
}

const pixalBayBaseUrl = "https://pixabay.com/api/?";
const pixalBayApiKey    = "key="+process.env.PIXEL_API_KEY;

app.post("/fetchimage", fetchImagefromAPI);
function fetchImagefromAPI(req, res) {
  var fullUrl =
    pixalBayBaseUrl +
    pixalBayApiKey +
    "&q=" +
    encodeURIComponent(req.body.placeName) +
    "&image_type=photo";
    console.log(fullUrl);
  request({ url: fullUrl }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: error });
    }
    let result = JSON.parse(body);
    if(result.totalHits > 0){
      let index = getRandomInt(result.hits.length);
    let newEntry ={
      imageURL : result.hits[index].webformatURL
    };
    imageData.push(newEntry);
  }
  else {
    return res.status(500).json({type:"error",message:"NO IMAGE FOUND"});
  }
    res.json(JSON.parse(body));
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = app