const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/20134763c9a412c935300b21aec5ad15/'
    + latitude + ',' + longitude
    + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!');    
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const { temperature, precipProbability } = body.currently;
            const daily = body.daily;
            const today = daily.data[0];
            console.log(today);
            callback(undefined, `${today.summary} It is currently ${temperature} out. There is a ${precipProbability}% chance of rain. The high today is ${today.temperatureHigh}. The low today is ${today.temperatureLow}.`);
        }
    });
}

module.exports = forecast;