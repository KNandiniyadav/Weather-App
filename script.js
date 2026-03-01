const cityName = document.getElementById("city");
const search = document.getElementById("btn");
const resultContainer = document.getElementById("result-section");
search.addEventListener("click", getData);
cityName.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        search.click();
    }
})


async function getData(){
    const city = cityName.value;
    const cityN = city.trim();

    if(cityN === ""){
        resultContainer.innerHTML="";
        const err = document.createElement("p");
        err.textContent="Please enter your input"
        resultContainer.append(err);
        return;

    }

    resultContainer.innerHTML = "";
    const loading = document.createElement("p");
    loading.textContent = "Loading...";
    resultContainer.append(loading);

    const apiKey = "2a6ec986f343dd2362636aab0c07961f"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityN}&appid=${apiKey}&units=metric`;


    try{

    const response = await fetch(url);
    const result = await response.json();
    

    if(response.ok){
        const name = result.name;
        const temp = result.main.temp;
        const feels = result.main.feels_like;
        const weather = result.weather[0].description;
        const humid = result.main.humidity;
        const wind = result.wind.speed;
        const icon = result.weather[0].icon;
   

        resultContainer.innerHTML="";
        const cityheading = document.createElement("h2");
        cityheading.textContent = name;
        const cityTemp = document.createElement("h3");
        cityTemp.textContent= Math.floor(temp) + "°C";
        const feelsLike = document.createElement("h3");
        feelsLike.textContent = `Feels Like : ${feels} °C`;
        const citydescription = document.createElement("h3");
        citydescription.textContent = ` Description : ${weather}`;
        const humidity = document.createElement("h3");
        humidity.textContent = `Humidity : ${humid} %`;
        const windSpeed = document.createElement("h3");
        windSpeed.textContent = `Wind : ${wind} m/s`;
        const weatherIcon = document.createElement("img");
        weatherIcon.src= `https://openweathermap.org/img/wn/${icon}@2x.png`;



        resultContainer.append(cityheading);
        resultContainer.append(cityTemp);
        resultContainer.append(feelsLike);
        resultContainer.append(citydescription);
        resultContainer.append(humidity);
        resultContainer.append(windSpeed);
        resultContainer.append(weatherIcon);
    }
    else{
        resultContainer.innerHTML="";
        const invalid = document.createElement("p");
        invalid.textContent="Invaid Input";
        resultContainer.append(invalid);
        return;
    }
}
    catch(error){
        resultContainer.innerHTML="";
        const erro = document.createElement("p");
        erro.textContent="Something went wrong, Please try again later."
        resultContainer.append(erro);
    }

}

