const city = ['Katmandu','Patan','Lalitpur', 'Sama']
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

fetchForeCastWeather('https://api.openweathermap.org/data/2.5/forecast?q=Pokhara&appid=b31f986179635820b5d31e28a4cf9fc2')

city.forEach(cty =>{
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
    })
})


searchBtn.addEventListener('click',()=>{
const cityName = searchEl.value;
if(cityName.length == 0){
    console.log('Enter city name')
}else{
    console.log(cityName)
 const searchUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=b31f986179635820b5d31e28a4cf9fc2' 
 fetchWeather(searchUrl)  
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



async function fetchForeCastWeather(url){
    const config = {
        headers:{
            'Accept':"application/json"
        }
    }

    const res = await fetch(url,config)
    const data = await res.json()
    const list = data.list
    list.forEach(item =>{
        const forecastContain = document.createElement('div')
        const time = document.createElement('p')
        time.classList.add('time')
        time.innerText = formatTime(item.dt_txt)
        const image = document.createElement('img')
        image.classList.add('img')
        image.src = "https://openweathermap.org/img/wn/" + item.weather[0]['icon'] +"@2x.png"
        console.log(image)    
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