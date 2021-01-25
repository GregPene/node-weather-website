const request = require('request')

const geocode = (address, callback) => {
    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2R1Y2xvcyIsImEiOiJjazkzMGVnOW8wMGg2M21ubmM0enRzdHl2In0.c70hjzzMBki8hvql-5UY5g&limit=1'
    //const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/cfegatd.json?access_token=pk.eyJ1Ijoic2R1Y2xvcyIsImEiOiJjazkzMGVnOW8wMGg2M21ubmM0enRzdHl2In0.c70hjzzMBki8hvql-5UY5g&limit=1'

    request({url: geo_url, json: true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to Location Service', undefined)
        } else if (body.features.length === 0) {
            callback('Unknowwn location', undefined)
        } else {
            callback('undefined', {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode