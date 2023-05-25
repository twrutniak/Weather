<template>
    <q-card class="weather-tile-card bg-grey-3">

        <q-card-section class="image-data">
            <div class="image-wrapper">
                <img class="weather-image" :src="this.weatherIconPath" />
            </div>
            <div class="image-description">
                <div class="location-name">
                    <p class="name">{{ locationName }}</p>
                    <p class="period">(7 days)</p>
                </div>
                <q-separator></q-separator>
                <div class="location-description">
                    <p>Max temp: <span>{{ maxTemp }}°C</span></p>
                    <p>Min temp: <span>{{ minTemp }}°C</span></p>
                    <p>Mean temp: <span>{{ meanTemp }}°C</span></p>
                </div>
            </div>
        </q-card-section>

        <q-card-section class="numeric-data">
            <div v-if="chartLoaded" class="graph">
                <Line :options="chartOptions" :data="tempChartData">
                </Line>
            </div>
            <div v-if="chartLoaded" class="graph">
                <Line :options="chartOptions" :data="precipitationChartData">
                </Line>
            </div>
            <div v-if="chartLoaded" class="graph">
                <Line :options="chartOptions" :data="pressureChartData">
                </Line>
            </div>
            <div v-if="chartLoaded" class="graph">
                <Line :options="chartOptions" :data="visibilityChartData">
                </Line>
            </div>
        </q-card-section>

    </q-card>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


export default {
    name: 'WeatherTile',
    components: { 'Line': Line },

    props: {
        locationName: { type: String, required: true },
        weatherData: { type: Object, required: true }
    },

    computed: {
    },

    data() {
        return {
            weatherIconPath: String,
            chartLoaded: false,
            weatherCode: Number,
            temperatureUnit: '°C',
            minTemp: Number,
            maxTemp: Number,
            meanTemp: Number,
            chartOptions: {
                scales: {
                    x: {
                        ticks: {
                            display: true,
                            autoSkip: true,
                            maxTicksLimit: 15,
                        },
                    },
                },
                responsive: true,
                maintainAspectRatio: false
            },
            tempChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        backgroundColor: '#f87979',
                        data: []
                    }]
            },
            precipitationChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Precipitation probability (%)',
                        backgroundColor: '#27cad6',
                        data: []
                    }]
            },
            pressureChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Surface pressure (hPa)',
                        backgroundColor: '#000000',
                        data: []
                    }]
            },
            visibilityChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Visibility (m)',
                        backgroundColor: '#e6e332',
                        data: []
                    }]
            },
        };
    },

    methods: {
        getWeathercodeIcon: function (weathercode, time) {
            let file = '';

            let currentHour = time;
            let isDay = true;

            console.log(currentHour);

            if ([19, 20, 21, 22, 23, 0, 1].includes(currentHour)) {
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
            }  else if ([71, 73, 75].includes(weathercode)) {
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
    },
    mounted: async function () {
        this.chartLoaded = false;

        // Get icon based on the weathercode
        let date = new Date;
        let path = this.getWeathercodeIcon(this.$props.weatherData.hourly.weathercode[0], date.getHours());
        this.weatherIconPath = path;

        //  Getting specific info for each graph
        let processed_labels = this.$props.weatherData.hourly.time.map(label => label.slice(-5));
        let temperature_data = this.$props.weatherData.hourly.temperature_2m;
        let precipitation_data = this.$props.weatherData.hourly.precipitation_probability;
        let pressure_data = this.$props.weatherData.hourly.surface_pressure;
        let visibility_data = this.$props.weatherData.hourly.visibility;
        
        // Getting basic weather info
        this.maxTemp = Math.max.apply(Math, temperature_data);
        this.minTemp = Math.min.apply(Math, temperature_data);
        this.meanTemp = (temperature_data.reduce((a, b) => a + b, 0) / temperature_data.length).toFixed(1);

        // Temperature graph
        this.tempChartData.labels = processed_labels;
        this.tempChartData.datasets[0].data = temperature_data;
        // Precipitation graph
        this.precipitationChartData.labels = processed_labels;
        this.precipitationChartData.datasets[0].data = precipitation_data;
        // Pressure graph
        this.pressureChartData.labels = processed_labels;
        this.pressureChartData.datasets[0].data = pressure_data;
        // Visibility graph
        this.visibilityChartData.labels = processed_labels;
        this.visibilityChartData.datasets[0].data = visibility_data;

        this.chartLoaded = true;
    }

};
</script>
<style scoped lang="scss">
.weather-tile-card {
    display: flex;
    flex-wrap: wrap;
    min-height: 100%;
}

@media (min-width: 0px) {
    .weather-tile-card {
        flex-wrap: wrap;
    }

    .image-data {
        display: flex;
        flex-flow: column;
        flex-basis: 100%;
    }
}

@media (min-width: $breakpoint-xs) {
    .weather-tile-card {
        flex-wrap: wrap;
    }

    .image-data {
        display: flex;
        flex-flow: column;
        flex-basis: 100%;
    }
}

@media (min-width: $breakpoint-sm) {
    .weather-tile-card {
        flex-wrap: nowrap;
    }

    .image-data {
        display: flex;
        flex-flow: column;
        flex: 0;
    }
}

@media (min-width: $breakpoint-md) {
    .weather-tile-card {
        flex-wrap: nowrap;
    }

    .image-data {
        display: flex;
        flex-flow: column;
        flex: 0;
    }
}

@media (min-width: $breakpoint-lg) {
    .weather-tile-card {
        flex-wrap: nowrap;
    }

    .image-data {
        display: flex;
        flex-flow: column;
        flex: 0;
    }
}

.weather-image {
    background-color: black;
    border-radius: 20px;
}

.image-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-wrapper img {
    width: 150px;
    height: 150px;
}

.numeric-data {
    display: flex;
    flex-flow: column;
    flex: 1;

    overflow-x: scroll;
}

.numeric-data div {
    flex: 1;
}

.location-name {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}

.location-name .name {
    font-size: 1.5rem;
}

.location-name .period {
    font-size: 0.8rem;
}

.location-name {
    color: $grey-7;
}

.location-name p {
    margin: 0;
    padding: 0;
}

.location-description {
    font-size: 0.8rem;
    padding: 10px;
}
.location-description p {
    color: $grey-7;
    margin-bottom: 5px;
}

.location-description p span {
    color: $primary;
}
</style>