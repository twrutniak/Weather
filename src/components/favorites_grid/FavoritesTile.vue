<template>
    <article glossy class="favorite-tile" 
            @mouseover="crossButtonVisible = true" 
            @mouseleave="crossButtonVisible = false">
        <q-btn glossy rounded color="primary" text-white class="button" 
            @click="selectFavoriteTile">
            <div class="favorite-tile-contents">
                <div class="image"><img :src="weatherIconPath" /></div>
                <p class="title">{{ locationName }}</p>
                <p class="data">{{ currentTemp }}°C</p>
            </div>

        </q-btn>

        <Transition name="fade-fast">
            <q-btn v-if="crossButtonVisible" 
                glossy rounded color="negative" text-white class="cross-button"
                @click="removeFavoriteTile">
                X
            </q-btn>
        </Transition>

    </article>
</template>
  
  
<script>
import { Notify } from 'quasar';
import { getWeathercodeIcon } from '@/helper_functions';
import { callWeatherAPI } from '@/helper_functions';

export default {
    name: 'FavoritesTile',
    emits: ['favoriteTileSelected', 'favoriteTileRemoved'],
    props: {
        selectedFeature: { type: Object, required: true },
    },

    data() {
        return {
            selectedFeatureWeatherData: {},
            weatherIconPath: String,
            crossButtonVisible: false,
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
        removeFavoriteTile: function () {
            Notify.create({
                message: 'Success!',
                caption: `Deleted ${this.locationName} from favorites.`,
                color: 'positive'
            });
            this.$emit('favoriteTileRemoved', this.$props.selectedFeature);
        }
    },

    mounted: async function () {
        this.selectedFeatureWeatherData = await callWeatherAPI(
            this.$props.selectedFeature.geometry.coordinates[1],
            this.$props.selectedFeature.geometry.coordinates[0]
        )

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
    max-width: 50%;

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
}

.cross-button {
    position: absolute;
    z-index: 10;
    font-weight: bold;
}
</style>