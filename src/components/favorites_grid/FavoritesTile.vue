<template>
    <article glossy class="favorite-tile">
        <q-btn @click="selectFavoriteTile" glossy rounded color="primary" text-white class="button">
            <div class="favorite-tile-contents">
                <div class="image"><img :src="weatherIconPath" /></div>
                <p class="title">{{ locationName }}</p>
                <p class="data">{{ currentTemp }}°C</p>
            </div>
        </q-btn>
    </article>
</template>
  
  
<script>
import { Notify } from 'quasar';
import { getWeathercodeIcon } from '@/helper_functions';
import axios from 'axios';
import { constructWeatherURL } from '@/helper_functions';

export default {
    name: 'FavoritesTile',
    emits: ['favoriteTileSelected'],
    props: {
        selectedFeature: { type: Object, required: true },
    },

    data() {
        return {
            selectedFeatureWeatherData: {},
            weatherIconPath: String,
            currentTemp: {},
        };
    },

    computed: {
        locationName: function () {
            return this.$props.selectedFeature.properties.geocoding.name;
        },
    },

    methods: {
        selectFavoriteTile: function () {
            Notify.create({
                message: 'Success!',
                caption: `Selected ${this.locationName} to display data.`,
                color: 'positive'
            });
            this.$emit('favoriteTileSelected', this.$props.selectedFeature);
        },
        callWeatherAPI: async function () {
            let url = constructWeatherURL(
                // API base URL
                process.env.VUE_APP_WEATHER_URL,
                // latitude
                this.$props.selectedFeature.geometry.coordinates[1],
                // longitude
                this.$props.selectedFeature.geometry.coordinates[0],
                // forecast days
                7,
            );
            await axios.get(url).then(response => {
                this.selectedFeatureWeatherData = response.data;
            });
        }
    },

    mounted: async function () {
        await this.callWeatherAPI();

        let date = new Date;
        let path = getWeathercodeIcon(this.selectedFeatureWeatherData.hourly.weathercode[0], date.getHours());
        this.weatherIconPath = path;

        console.log(this.selectedFeatureWeatherData.hourly.temperature_2m)
        this.currentTemp = this.selectedFeatureWeatherData.hourly.temperature_2m[0];
    },

};
</script>
<style scoped lang="scss">
.favorite-tile {
    display: flex;
    flex-flow: column;
    flex-basis: 50%;

    aspect-ratio: 1/1;

    padding: 15px;
}

.favorite-tile .button {
    width: 100%;
    height: 100%;
}

.favorite-tile-contents {
    display: flex;
    flex-flow: column;
}

.favorite-tile-contents p {
    margin: 0;
    padding: 0;
}

.favorite-tile-contents .image {
    width: 100%;
}

.favorite-tile-contents .image img {
    width: 50px;
    height: 50px;
}

.favorite-tile-contents .title {
    font-size: 1.1rem;
}

.favorite-tile-contents .data {
    font-size: 0.725rem;
}</style>