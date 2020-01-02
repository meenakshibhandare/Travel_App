/* Global Variables */
//need {zip code},{country code} as parameters. USA is default for country
const baseurl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=d217e03094f9bb4e02348d2c0907bef5";

// Create a new date instance dynamically with JS
let d = new Date();
let todayDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
  if (document.getElementById("image").childElementCount > 0) {
    document
      .getElementById("image")
      .removeChild(document.getElementById("image").childNodes[0]);
  }
  const z = document.getElementById("place").value;
  const startDate = document.getElementById("travel_date").value;
  const endDate   = document.getElementById("end_date").value;
  var travelDate = new Date(startDate);
  var travelEndDate = new Date(endDate);
  var numberOfVacationDays = (travelEndDate - travelDate)/ (1000 * 60 * 60 * 24);
  if(numberOfVacationDays < 0){
    document.getElementById("travel_info").textContent = "END_DATE is before START_DATE of travel";
  }
  else {
    document.getElementById("travel_info").textContent = "LENGTH OF TRIP " + numberOfVacationDays;
  }
  var numberOfDaysForTravelToStart =
    (travelDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  var temp = Client.getCoordinate(z)
    .then(function(data) {
      if (numberOfDaysForTravelToStart > 7) {
        var result1 = Client.getTemperaturePredict(
          data.latitude,
          data.longitude,
          travelDate
        ).then(function(data) {
          return data;
        });
      } else {
        var result1 = Client.getTemperature(data.latitude, data.longitude).then(
          function(data) {
            return data;
          }
        );
      }
      return result1;
    })
    .then(Client.getImage(z))
    .then(function(data) {
      updateUI();
    });
}

const updateUI = async () => {
  const request = await fetch("//localhost:3500/all");
  try {
    const allData = await request.json();
    console.log(allData);
    if (allData[allData.length - 1].temperature === undefined) {
      document.getElementById("weather").textContent =
        "TEMP is not present for the location";
    } else {
      document.getElementById("weather").textContent =
        "TEMP is " + allData[allData.length - 1].temperature;
    }

    if (allData[allData.length - 1].imageLink === undefined) {
      var x = document.createElement("DIV");
      x.textContent = "IMAGE IS NOT PRESENT";
      document.getElementById("image").appendChild(x);
    } else {
      var x = document.createElement("IMG");
      x.setAttribute("src", allData[allData.length - 1].imageLink);
      document.getElementById("image").appendChild(x);
    }
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
export const getTemperatureInfo = async (baseurl, zip, key) => {
  const res = await fetch(baseurl + zip + key + "&units=metric");
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
