const request = require("postman-request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiaGFyaXNhaG1hZDQ1NyIsImEiOiJjbGRuNjhkMXkwMDdvM3ZvNmN2dXp0enljIn0.iOTLkho0JJIi10g1ABiwGQ"
    request(url, (error,response,body)=>{
            if (error){
                callback("Unable to connect to location api!", undefined, undefined)
            }
            else{
                callback(undefined, response, JSON.parse(body))
            }
        })
}



module.exports = geocode