import sunny from "./Images/weather-sunny.svg";
export const sunnyIcon = sunny;
import cloudy from "./Images/weather-cloudy.svg";
export const cloudyIcon = cloudy;
import partlyCloudy from "./Images/weather-partly-cloudy.svg"
const partlyCloudyIcon = partlyCloudy;

export function getIcon(weatherConditions) {
    if (weatherConditions === "Clear") {
        return sunnyIcon;
    } else if (weatherConditions === "Overcast") {
        return cloudyIcon
    } else {
        return partlyCloudyIcon
    }
}