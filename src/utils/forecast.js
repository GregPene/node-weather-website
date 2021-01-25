const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=16a18300ddb7af5d37a2af3b627abec2&query='+longitude+','+latitude


    request({url, json: true},(error, {body}) => {
        if(error) {
            callback(error, 'undefined')
        }
        else {
            callback('undefined', 'It is currently '+body.current.weather_descriptions[0]
            +', temperature is '+body.current.temperature
            +' and feels like '+body.current.feelslike
            )
        }
    })
}

module.exports = forecast