import {getCoordinate} from '../client/js/nameTocordinates';

test("testing getcoordinate" , () => {
  beforeEach( () => {
      fetch.resetMocks();
  })
  fetch.mockResponseOnce(JSON.stringify(
      { geonames: 
        [
            {lat: 1 , lng: 1, countryName: "USA"}
        ]
    }
        ));

  expect.hasAssertions();
  return getCoordinate("testing").then(data => {
      const result = data;
      expect(result.latitude).toEqual(1);
      expect(result.longitude).toEqual(1);
      expect(result.country).toEqual("USA");
  })

});