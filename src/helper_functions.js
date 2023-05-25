function constructWeatherURL(
    base_url = 'https://api.open-meteo.com/v1',
    latitude,
    longitude,
    forecast_days = 7,
) {
    let url_string = base_url + `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,surface_pressure,visibility&forecast_days=${forecast_days}`;
    return url_string;
}

function getWeathercodeIcon(weathercode) {
    let file_string = '';
    if (weathercode == 0) {
        file_string = 'weather_icon-01';
    } else if ([1, 2, 3].includes(weathercode)){ 
        file_string = 'weather_icon-16';
    } else if ([45, 48].includes(weathercode)) {
        file_string = 'weather_icon-61';
    } else if ([51, 53, 55].includes(weathercode)) {
        file_string = 'weather_icon-49';
    } else if ([56, 57].includes(weathercode)) {
        file_string = 'weather_icon-26';
    } else if ([61, 63, 65].includes(weathercode)) {
        file_string = 'weather_icon-36';
    } else if ([66, 67].includes(weathercode)) {
        file_string = 'weather_icon-31';
    } else if ([71, 73, 75].includes(weathercode)) {
        file_string = 'weather_icon-25';
    } else if ([77].includes(weathercode)) {
        file_string = 'weather_icon-25';
    } else if ([80, 81, 82].includes(weathercode)) {
        file_string = 'weather_icon-36';
    } else if ([85, 86].includes(weathercode)) {
        file_string = 'weather_icon-25';
    } else if ([95].includes(weathercode)) {
        file_string = 'weather_icon-29';
    } else if ([96, 99].includes(weathercode)) {
        file_string = 'weather_icon-29';
    }
    return '@/assets/' + file_string + '.png';
}



// await function sleep (ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

export { constructWeatherURL }
export { getWeathercodeIcon }