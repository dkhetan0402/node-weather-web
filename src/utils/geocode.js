//HTTP client
const request = require('request');

const geocode = (address, callback) => {
    //Mapbox url for geocoding
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVlcGFra2hldGFuMDIiLCJhIjoiY2s5a2F3ZG00MDBrbzNrbWg3aDdhNHdneSJ9.4QKGj0j4BUcc3HwVHgIyoQ&autocomplete=false&types=place&limit=2';
    request({url: url, json: true}, (error, response, {features}) => {
        if(error){
            callback('Unable to connect to location service!', undefined);
        }else if(!features || (features && features.length === 0)){
            callback('Unable to find the specified location. Try another search', undefined);
        }else{
            const place = features.find(({text}) => text === address);
            if(place){
                const data = {
                    latitude: place.center[1],
                    longitude: place.center[0],
                    location: place.place_name
                }
                callback(undefined, data);
            }else{
                callback('Too many places found. Narrow your search by providing complete city name');
            }          
        }
    });
};

module.exports = {
    geocode: geocode
}