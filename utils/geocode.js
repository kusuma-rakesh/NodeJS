const request = require('request');
const geocode = (address,callback)=>{
    // http://api.positionstack.com/v1/forward?access_key=ff79b2354f84ea44bdfea611f9b604f1&query=Hyderabad Andhra Pradesh india
    const url = 'http://api.positionstack.com/v1/forward?access_key=ff79b2354f84ea44bdfea611f9b604f1&query='+address
    //console.log(url_gcode);
    
    request({url,json:true},(error,{body})=>{
    //    const data = response.body.data[0];
    //    console.log(data);  
        if(error){
            callback('Network Error',undefined);
        }
        else if(body.data[0].length ===0){
            callback('No Results Found',undefined);
        }
        else{
            callback(undefined,{
                 latitude: body.data[0].latitude,
                 longitude: body.data[0].longitude,
                 placeName: body.data[0].name
            })            
        }
    })
    
}

module.exports = geocode;