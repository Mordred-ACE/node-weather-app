const request = require('postman-request')

const weather = (address, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6101bb8eadc46c5abdcf147d8cbc02c4&query=" + address
    request(url, (error,response,body)=>{
        if (error){
            callback("Unable to connect to weather api!", undefined, undefined)
        }
        else{
            callback(undefined, response, JSON.parse(body))
        }
    })
}



module.exports = weather