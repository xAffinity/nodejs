const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=aNowSGo8eDyRYkJLBEUTLnkn1FWIYM2U&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => { 
        if (error) {
            callback('Unable to connect to MapQuest servers.');
        } else if (body.info.statuscode === 601) {
            callback('Unable to find that address.');
        } else if (body.info.statuscode === 0) {
            callback(undefined, {
                address: (body.results[0].providedLocation.location).toUpperCase() + ' ' + body.results[0].locations[0].adminArea3 + ' ' + body.results[0].locations[0].postalCode + ' ' + body.results[0].locations[0].adminArea1,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
            console.log(`Address: ${body.results[0].providedLocation.location}`);
            console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;