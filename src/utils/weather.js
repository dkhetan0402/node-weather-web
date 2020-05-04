//HTTP client
const request = require('request');

const weather = (latitude, longitude, callback) => {
    //Weather stack url for weather
    const url = 'http://api.weatherstack.com/current?access_key=b95f4090788cab50d2e4df76b5beea6b&query=' + encodeURIComponent(latitude+','+longitude) + '&units=f';

    request({url: url, json: true}, (error, response, {error: bodyError, current} = {}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        }else if(bodyError){
            callback('Unable to find weather for specified location. Try another search');
        }else{
            callback(undefined, current.weather_descriptions[0] + ' with a temperature of '+current.temperature+' degrees. It feels like '+current.feelslike+' degrees. Chance of rain is '+current.precip+'%');
        }
    });
};

module.exports = {
    forecast: weather
}
