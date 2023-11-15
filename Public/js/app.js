console.log("Javascript Code calling from Script Tags")
//'http://puzzle.mead.io/puzzle' --> generates a new response on every refresh 
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data); 
//     })
// })
/*
fetch('http://api.weatherstack.com/forecast?access_key=87a00a047e623669c85e68f3731779dd&query=17.44,78.46&units=m').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{ 
        console.log(data.location);
        console.log(data.temperature);
        }
    })
})
*/
/*
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error){
            console.log(data.error)
        }else{             
            console.log(data.address);
            console.log(data.forecast.temperature);
        }
    })
})
*/

const weatherForm= document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading data...';
    messageTwo.textContent = "";

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error){
            messageOne.textContent = data.error;
        }else{             
            messageOne.textContent = data.address;
            messageTwo.textContent=data.forecast.temperature;
            }
        })
    })
})
