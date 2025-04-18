import "./styles.css";
const body = document.querySelector("body")
function farenheitToCelcius(x) {
    let num = ((x-32)*5/9)
    return num.toFixed()
}

const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const key = "?key=XPC5LAZK45WC8V2M2GJRUV8SG"
const currentLocation = []
class Location {
    constructor(name, temperature, conditions) {
        this.name = name;
        this.temperature = farenheitToCelcius(temperature);
        this.conditions = conditions;
        
    } get celsius() {
        return (farenheitToCelcius(this.temperature))
    }
}
function newLocation(LocationName, locationTemperature, locationConditions) {
    let location = new Location(LocationName, locationTemperature, locationConditions);
    currentLocation.splice(0,1,location)
}

async function getCityData(city) {
    try {
        const response = await fetch(url+city+key, {mode: "cors"})
        const responseData = await response.json();
        console.log(responseData)
        newLocation(responseData.address, responseData.currentConditions.temp, responseData.currentConditions.conditions)
        updateDOM()
    } catch (error) {
        console.error();
        
    }
}

// create card for weather
const content = document.getElementById("content");
const weatherCard = document.createElement("div");
weatherCard.classList.add("weatherCard");
function updateDOM() {
    while (weatherCard.firstChild) {
        weatherCard.removeChild(weatherCard.firstChild)
    }
    for (const property in currentLocation[0]) {
        const weatherProperty = document.createElement("div");
        weatherProperty.id = property
        weatherProperty.innerHTML = currentLocation[0][property];
        weatherCard.appendChild(weatherProperty);
        content.appendChild(weatherCard)
    }
}
const searchBar = document.querySelector("input")
const searchBtn = document.querySelector("button")

searchBtn.addEventListener("click", () => {
    const searchInput = searchBar.value;
    getCityData(searchInput);
})