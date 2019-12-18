/* Global Variables */
//need {zip code},{country code} as parameters. USA is default for country
const baseurl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=d217e03094f9bb4e02348d2c0907bef5";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
  const feelings = document.getElementById("feelings").value;
  const z = document.getElementById("zip").value;
  getTemperatureInfo(baseurl, z, apiKey).then(function(data) {
    postData("/add", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: feelings
    }).then(updateUI());
  });
}

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("temp").innerHTML =
      "TEMP is " + allData[allData.length - 1].temperature;
    document.getElementById("content").innerHTML =
      allData[allData.length - 1].userResponse;
    document.getElementById("date").innerHTML =
      allData[allData.length - 1].date;
  } catch (error) {
    console.log("error", error);
  }
};

//postdata function
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    //Body data tye must match 'Contect-Type' header
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Fetch call
const getTemperatureInfo = async (baseurl, zip, key) => {
  const res = await fetch(baseurl + zip + key + "&units=metric");
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
