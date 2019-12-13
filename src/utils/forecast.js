const request = require('request');


const forecast = (lat, long, callback) => {
    url = 'https://api.darksky.net/forecast/384407a20bed64baeb2b543ef41019cd/' +
        encodeURIComponent(lat) + ',' + encodeURIComponent(long) //38.8784082,-77.1171647'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location. Try new coordinates')
        } else {

            const currently = body.currently;

            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: currently.temperature,
                precipProb: currently.precipProbability,
                feelsLike: currently.apparentTemperature
            })

        }
    })
}

module.exports = forecast;