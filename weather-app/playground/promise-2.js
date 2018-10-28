const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=aNowSGo8eDyRYkJLBEUTLnkn1FWIYM2U&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => { 
            if (error) {
                reject('Unable to connect to MapQuest servers.');
            } else if (body.info.statuscode === 601) {
                reject('Unable to find that address.');
            } else if (body.info.statuscode === 0) {
                resolve({
                    address: (body.results[0].providedLocation.location).toUpperCase() + ' ' + body.results[0].locations[0].adminArea3 + ' ' + body.results[0].locations[0].postalCode + ' ' + body.results[0].locations[0].adminArea1,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });
};

geocodeAddress('S457664').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});