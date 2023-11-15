const request = require('request');
//destructuring the code
/*
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=87a00a047e623669c85e68f3731779dd&query='+latitude+','+longitude+'&units=m';
    console.log(url);
    //request({url:url,json:true},(error,response)=>{
    request({url,json:true},(error,response)=>{  //using shorthand syntax for url
        //console.log(response.body.forecast.data);
        if(error){
            callback('Network Error',undefined)
        }else if(response.body.success === false){
            callback('Bad Request Error',undefined);
        }else{
            callback(undefined,{
                currentTemperature : response.body.current.temperature,
                windPressure : response.body.current.pressure,
                weatherDesc : response.body.current.weather_descriptions[0],
                rainforecast : response.body.current.precip,
                location : response.body.location.name
            })
        }
    })
}
*/
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/forecast?access_key=87a00a047e623669c85e68f3731779dd&query='+latitude+','+longitude+'&units=m';
    console.log(url);
    //request({url:url,json:true},(error,response)=>{
    request({url,json:true},(error,{body})=>{  //using shorthand syntax for url
        //console.log(response.body.forecast.data);
        if(error){
            callback('Network Error',undefined)
        }else if(body.success === false){
            callback('Bad Request Error',undefined);
        }else{
            callback(undefined,{
                currentTemperature : body.current.temperature,
                windPressure :body.current.pressure,
                weatherDesc : body.current.weather_descriptions[0],
                rainforecast : body.current.precip,
                location : body.location.name
            })
        }
    })
}

module.exports = forecast;