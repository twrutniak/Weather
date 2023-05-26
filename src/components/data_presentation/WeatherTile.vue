<template>
    <q-card class="weather-tile-card bg-grey-1">
        <ImageData
            :feature-data="this.$props.featureData"
            :weather-icon-path="weatherIconPath"
            :location-name="locationName"
            :min-temp="minTemp"
            :max-temp="maxTemp"
            :mean-temp="meanTemp">
        </ImageData>

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
import ImageData from './image_data/ImageData.vue';
import { getWeathercodeIcon } from '@/helper_functions';

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
    components: { 'Line': Line,
                  'ImageData': ImageData },

    props: {
        featureData: { type: Object, required: true},
        weatherData: { type: Object, required: true }
    },

    computed: {
        locationName: function() {
            return this.$props.featureData.properties.geocoding.name;
        }
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
            initialRender: true,
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
        renderData: async function () {
            this.chartLoaded = false;

            // Get icon based on the weathercode
            let date = new Date;
            let path = getWeathercodeIcon(this.$props.weatherData.hourly.weathercode[0], date.getHours());
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
            this.tempChartData = {
                labels: processed_labels,
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        backgroundColor: '#f87979',
                        data: temperature_data
                    }]
            },
            // Precipitation graph
            this.precipitationChartData = {
                labels: processed_labels,
                datasets: [
                    {
                        label: 'Precipitation probability (%)',
                        backgroundColor: '#27cad6',
                        data: precipitation_data
                    }]
            },
            // Pressure graph
            this.pressureChartData = {
                labels: processed_labels,
                datasets: [
                    {
                        label: 'Surface pressure (hPa)',
                        backgroundColor: '#000000',
                        data: pressure_data
                    }]
            }
            // Visibility graph
            this.visibilityChartData = {
                labels: processed_labels,
                datasets: [
                    {
                        label: 'Visibility (m)',
                        backgroundColor: '#e6e332',
                        data: visibility_data
                    }]
            }

            this.chartLoaded = true;
        },
    },
    mounted: async function () {
        if (this.initialRender) {
            await this.renderData();
            this.initialRender = false;
        }
    },
    watch: { 
      weatherData: async function() { 
        await this.renderData();
      }
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
}

@media (min-width: $breakpoint-xs) {
    .weather-tile-card {
        flex-wrap: wrap;
    }
}

@media (min-width: $breakpoint-sm) {
    .weather-tile-card {
        flex-wrap: nowrap;
    }
}

@media (min-width: $breakpoint-md) {
    .weather-tile-card {
        flex-wrap: nowrap;
    }
}

@media (min-width: $breakpoint-lg) {
    .weather-tile-card {
        flex-wrap: nowrap;
    }
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

</style>