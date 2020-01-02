export function getTemperature(lat, long) {
  var response = fetchTemperature("//localhost:3500/fetchtemperaturecurrent",{latitude: lat,longitude: long})
                .then(function(data){
                    return data;
                });
                console.log(response);
  return response
}

export function getTemperaturePredict(lat,long,traveldate) {
    var convertToUnixTime = (traveldate.getTime())/1000;
    var response = fetchTemperature("//localhost:3500/fetchtemperaturepredict",{latitude: lat,longitude: long,time: convertToUnixTime})
                .then(function(data){
                    return data;
                });
    console.log(response);
  return response;
}

const fetchTemperature = async (url = "", data = {}) => {
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
    return newData;
  } catch (error) {
    console.log("error"+error.message);
  }
};
