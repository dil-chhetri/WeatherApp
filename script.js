const cityEl = document.getElementById('cityname')
const searchEl = document.getElementById('inputcity')
const searchBtn = document.getElementById('search')
const currentIcon = document.getElementById('currentIcon')
const weatherDesc = document.getElementById('desc')
const currentTemp = document.getElementById('temp')
const defaultUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Pokhara&appid=b31f986179635820b5d31e28a4cf9fc2'
fetchWeather(defaultUrl)

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