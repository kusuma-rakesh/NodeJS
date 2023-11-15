const express = require('express');
const path = require('path')
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


console.log('___________________________________________________')
console.log(__dirname);
console.log(__filename);
const publicDirPath = path.join(__dirname,'/Public');
console.log(publicDirPath)
const viewsDirPath = path.join(__dirname,'/templates/views');
console.log(viewsDirPath)

const partialsDirPath = path.join(__dirname,'/templates/partials');
console.log(partialsDirPath)
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.set('view engine','hbs');
app.set('views',viewsDirPath);
/*
app.get('',(req,res)=>{
    res.render('index.hbs') //calling index.hbs, extension is not much required
})
*/
//calling index.hbs, extension is not much required
app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Root - NodeJS',
        name: 'Rakesh Kusuma'
    }) 
})
app.get('/About',(req,res)=>{
    res.render('About',{
        title:'About - About NodeJS',
        name:'Rakesh Kusuma'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help - JavasScript & NodeJS',
        name:'Rakesh Kusuma'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help - Page Not Found',
        name:'Rakesh Kusuma'
    })
})

app.get('/weather',(req,res)=>{
    /*
    if(!req.query.address){
        res.send({error: 'Provide the address'})
    }else{
        res.send({
            address: req.query.address,
            forecast:'It is very cool',
            location:'hyderabad'
        })
    }
    */
   console.log(req.query.address);
    if (!req.query.address){
        res.send({error: 'please provide the address'})
    }else {
        //Callback chaining 
        geocode(req.query.address, (error,{latitude,longitude}={data}) => { 
            console.log(latitude,longitude)
            if(error){
                return res.send({error});
            }else{
                forecast(latitude,longitude,(error,{location,weatherDesc,currentTemperature,windPressure,rainforecast}=forecastData)=>{
                    if(error){
                        return res.send({error});
                    }
                    res.send({
                        geocodes:{
                            latitude: latitude,
                            longitude: longitude
                        },
                        address: req.query.address,
                        forecast:{
                                    weatherDesc: weatherDesc,
                                    temperature: currentTemperature,
                                    rain: rainforecast,
                                    windPressure: windPressure
                                 },
                        location:'hyderabad'
                    })                    
                })
                
            }
        })

        }
       
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send('provide the search');
    }
    console.log(req.query.search);
    res.send({ products:[]});
})

app.get('*',(req,res)=>{
    res.render('404',{title:"404 Not Found", name: "Rakesh Kusuma"});  // render shows error message, send - shows a message(not like error)
})
/*
    let's consider the below domain for our work
    app.com
    app.co/help
    app.com/about
    app.com/weather

*/

//got a request to app.com(meaning visited the homepage, > show some results), send response to requester saying hello express
/*
app.get('',(req,res)=>{
    res.send('<H1>Hello Express!</H1>');
}) 
app.get('/help',(req,res)=>{
    res.send([{name:'Rakesh'},{name:'Kusuma'}]);
}) 
app.get('/about',(req,res)=>{
    res.send(`<h2 color:blue><FONT COLOR="Red"> Hello..Your'e in about page for to look for information</h2>`) 
})
app.get('/weather',(req,res) =>{
    res.send({
        location:'Hyderabad',
        temperature: 25
    });
})
*/


//start server by listen
app.listen(3000,()=>{
    console.log('server started by using port -3000');
})

