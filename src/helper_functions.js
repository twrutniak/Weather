function constructWeatherURL(
        base_url='https://api.open-meteo.com/v1',
        latitude,
        longitude,
        forecast_days=7,
    ) {
    let url_string = base_url + `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&forecast_days=${forecast_days}`;
    return url_string;
}

export { constructWeatherURL }