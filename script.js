const city = []
const cityCollection = document.querySelector('.popup')
const cityEl = document.getElementById('cityname')
const searchEl = document.getElementById('inputcity')
const searchBtn = document.getElementById('search')
const currentIcon = document.getElementById('currentIcon')
const weatherDesc = document.getElementById('desc')
const currentTemp = document.getElementById('temp')
const forecast = document.querySelector('.forecast')
const defaultUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Pokhara&appid=b31f986179635820b5d31e28a4cf9fc2'
fetchWeather(defaultUrl)
const defaultCastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Pokhara&appid=b31f986179635820b5d31e28a4cf9fc2'
fetchForecastWeather(defaultCastUrl)

let lsCityName = JSON.parse(localStorage.getItem("city"))
console.log(lsCityName)
lsCityName.forEach(cty =>{
    const names = document.createElement('span')
    names.classList.add('popname')
    names.innerText = cty
    cityCollection.appendChild(names)

})

const names = document.querySelectorAll('.popname')
names.forEach(name =>{
    name.style.display = 'none'
})
console.log(names)

searchEl.addEventListener('click',()=>{
    names.forEach(name =>{
        name.style.display = 'block'
        name.addEventListener('click',()=>{
            let tempUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+name.innerText+'&appid=b31f986179635820b5d31e28a4cf9fc2'
            fetchForecastWeather('https://api.openweathermap.org/data/2.5/forecast?q='+name.innerText+'&appid=b31f986179635820b5d31e28a4cf9fc2')
            fetchWeather(tempUrl)
            name.style.display = 'none'
        })
    })
})

document.addEventListener('mouseup',function (e) {
    names.forEach(name =>{
       if(!cityCollection.contains(e.target)){
        name.style.display = 'none'
       }
    })
  })


searchBtn.addEventListener('click',()=>{
const cityName = searchEl.value;
if(cityName.length == 0){
    console.log('Enter city name')
}else{

 const searchUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=b31f986179635820b5d31e28a4cf9fc2' 
 fetchWeather(searchUrl)  
 fetchForecastWeather('https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=b31f986179635820b5d31e28a4cf9fc2')
 city.push(cityName)
localStorage.setItem("city",JSON.stringify(city))

}
})




async function fetchWeather(url){
    const config = {
        headers:{
            'Accept':'application/json'
        }
        
    }
    const res = await fetch(url,config)
    const data = await res.json()
    cityEl.innerText = data.name
    currentTemp.innerText  = (data.main['temp'] - 273.15).toFixed(1) + "°c";
    weatherDesc.innerText = data.weather[0]['main']
    currentIcon.src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
  
    
}



async function fetchForecastWeather(castUrl){
    const config = {
        headers:{
            'Accept':"application/json"
        }
    }

    const res = await fetch(castUrl,config)
    const data = await res.json()
    const list = data.list
    forecast.innerHTML = ''
    list.forEach(item =>{
        const forecastContain = document.createElement('div')
        const time = document.createElement('p')
        time.classList.add('time')
        time.innerText = formatTime(item.dt_txt)
        const image = document.createElement('img')
        image.classList.add('img')
        image.src = "https://openweathermap.org/img/wn/" + item.weather[0]['icon'] +"@2x.png"
        
        const temp = document.createElement('h4')
        temp.classList.add('foreTemp')
        temp.innerText =(item.main['temp'] - 273.15).toFixed(1) + "°c"
        forecastContain.classList.add('forecast-container')
        forecast.appendChild(forecastContain)
        forecastContain.appendChild(time)
        forecastContain.appendChild(image)
        forecastContain.appendChild(temp)
    })
}

function formatTime(date){
    d = new Date(date);
    var h=d.getHours(),m=d.getMinutes(),l="AM";
    if(h > 12){
      h = h - 12;
    }
    if(h < 10){
      h = '0'+h;
    }
    if(m < 10){
      m = '0'+m;
    }
    if(d.getHours() >= 12){
      l="PM"
    }else{
      l="AM"
    }
  
    return h+':'+m+' '+l;
}