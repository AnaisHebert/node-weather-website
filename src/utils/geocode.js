const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
    + encodeURIComponent(address) 
    + '.json?access_token=pk.eyJ1IjoiaGViZXJ0LWFuYWlzIiwiYSI6ImNrMDd3bTl1NzBidTMzaHAwYWFwa3ZiNnAifQ.DqCcjHV9Z-lyx4N7Wm8b-g&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body.message) {
            callback('Error fetching location information!');
        } else if (body.features.length === 0) {
            callback('No results found for location, try another search');
        } else {
            const location = body.features[0].place_name;
            const coordinates = body.features[0].center;
            const latitude = coordinates[1];
            const longitude = coordinates[0];
            callback(undefined, { latitude, longitude, location });
        }
    })
}

module.exports = geocode;