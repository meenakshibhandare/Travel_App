export function getImage(location){
    var result = fetchImage("//localhost:3500/fetchimage",{placeName: location})
    .then(function(data){
        return data;
    });
    return result;
}

const fetchImage = async (url = "", data = {}) => {
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
      console.log("error"+error.message);
    }
  };