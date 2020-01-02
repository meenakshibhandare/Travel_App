const baseurl = "http://api.geonames.org/searchJSON?";
const key  = "&username=minakshiagrawal26";

function  getCoordinate(inputText){
    console.log(inputText);
    var locationText = "q=" + inputText;
    var finalresult = doGeoNamesAPICall(baseurl,key,locationText)
    .then(function(data){
        return data;
    });
    return finalresult
}

const doGeoNamesAPICall = async ( baseurl,key,place) => {
    const res = await fetch(baseurl+place+key);
  try{
      const data = await res.json();
      //This is giving a hughe list of cities possible
      //Might have to come up with a better alogrithm like following
      // If Enetered location is country , give a plan for the capital
      // If entered location is a state, give a plan for capital of state
      // If entered location is a city, and multiple locations are possible, get the one with highest population and report that
      //FIXME::For now taking the first entry in the array
      console.log(data.geonames[0].lat+","+data.geonames[0].lng);
      let newEntry = {
          latitude : data.geonames[0].lat,
          longitude: data.geonames[0].lng,
          country:   data.geonames[0].countryName
      };
      return newEntry;
  }catch(error){
      console.log("error",error);
  }
}

export {getCoordinate};