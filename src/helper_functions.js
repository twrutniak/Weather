function constructWeatherURL(
    base_url = 'https://api.open-meteo.com/v1',
    latitude,
    longitude,
    forecast_days = 7,
) {
    let url_string = base_url + `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,surface_pressure,visibility&forecast_days=${forecast_days}`;
    return url_string;
}

function getWeathercodeIcon(weathercode, time) {
    let file = '';

    let currentHour = time;
    let isDay = true;

    if ([19, 20, 21, 22, 23, 0, 1, 2, 3, 4].includes(currentHour)) {
        isDay = false;
    } else {
        isDay = true;
    }

    if (weathercode == 0) {
        isDay ? file = require('@/assets/clear-day.svg') : file = require('@/assets/clear-night.svg');
    } else if ([1, 2, 3].includes(weathercode)) {
        isDay ? file = require('@/assets/partly-cloudy-day.svg') : file = require('@/assets/partly-cloudy-night.svg');
    } else if ([45, 48].includes(weathercode)) {
        isDay ? file = require('@/assets/fog-day.svg') : file = require('@/assets/fog-night.svg');
    } else if ([51, 53, 55].includes(weathercode)) {
        file = require('@/assets/drizzle.svg');
    } else if ([56, 57, 66, 67].includes(weathercode)) {
        isDay ? file = require('@/assets/partly-cloudy-day-sleet.svg') : file = require('@/assets/partly-cloudy-night-sleet.svg');
    } else if ([61, 63, 65].includes(weathercode)) {
        isDay ? file = require('@/assets/partly-cloudy-day-rain.svg') : file = require('@/assets/partly-cloudy-night-rain.svg');
    } else if ([71, 73, 75].includes(weathercode)) {
        isDay ? file = require('@/assets/partly-cloudy-day-snow.svg') : file = require('@/assets/partly-cloudy-night-snow.svg');
    } else if ([77, 85, 86].includes(weathercode)) {
        file = require('@/assets/snow.svg');
    } else if ([80, 81, 82].includes(weathercode)) {
        file = require('@/assets/rain.svg');
    } else if ([95, 96, 99].includes(weathercode)) {
        isDay ? file = require('@/assets/thunderstorms-day.svg') : file = require('@/assets/thunderstorms-night.svg');
    }
    return file;
}

function setLocalStorageItem(object){
    let parsed_data = JSON.stringify(object);
    localStorage.setItem('weather_favorites', parsed_data);
    return true;
}

function getLocalStorageItem(name){
    let raw_data = localStorage.getItem(name);
    let parsed_data = JSON.parse(raw_data);
    return parsed_data;
}

function getWeatherFavorites(){
    return getLocalStorageItem('weather_favorites');
}

function addWeatherFavorite(item) {
    let favorites_array = getWeatherFavorites();
    if (favorites_array == null) {
        favorites_array = [];
    }
    favorites_array.push(item);
    setLocalStorageItem(favorites_array);
}

function removeWeatherFavorite(item) {
    let favorites_array = getWeatherFavorites();
    let index = favorites_array.indexOf(item);
    favorites_array.splice(index, 1);
    setLocalStorageItem(favorites_array);
}


export { constructWeatherURL }
export { getWeathercodeIcon }
export { setLocalStorageItem }
export { getLocalStorageItem }
export { getWeatherFavorites }
export { addWeatherFavorite }
export { removeWeatherFavorite }