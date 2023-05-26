<template>
    <q-card-section class="image-data">
        <div class="image-wrapper">
            <img class="weather-image" :src="weatherIconPath" />
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
            <q-separator></q-separator>
            <div class="control-buttons">
                <div class="button-row">
                    <q-btn-group push>
                        <q-btn color="primary" glossy text-color="white" push label="°C" :disabled="true" />
                        <q-btn color="primary" glossy text-color="white" push label="°F" />
                        <q-btn color="primary" glossy text-color="white" push label="°K" />
                    </q-btn-group>
                </div>
            </div>
            <div class="fav-button-wrapper">
                <q-btn @click="addToFavorites" class="favbutton" color="primary" glossy>Add to favorites</q-btn>
            </div>
        </div>
    </q-card-section>
</template>
  
<script>
import { Notify } from 'quasar'
import { addWeatherFavorite } from '@/helper_functions';

export default {
    name: 'ImageData',
    components: {
    },

    props: {
        weatherIconPath: { type: String, required: true },
        locationName: { type: String, required: true },
        minTemp: { type: Number, required: true },
        maxTemp: { type: Number, required: true },
        meanTemp: { type: Number, required: true },
        featureData: { type: Object, required: true }
    },

    data() {
        return {
        };
    },

    methods: {
        addToFavorites: function () {
            addWeatherFavorite(this.$props.featureData);
            Notify.create({
                message: 'Success!',
                caption: `Added ${this.locationName} to favorites.`,
                color: 'positive'
            })
        }
    },
    mounted: function () {
    },

};
</script>
<style scoped lang="scss">
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

.control-buttons {
    font-size: 0.8rem;
    padding: 10px;
}

.control-buttons .button-row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fav-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fav-button {
    padding-top: 10px;
    font-size: 0.8rem;
}

@media (min-width: 0px) {
    .image-data {
        display: flex;
        flex-flow: column;
        flex-basis: 100%;
    }
}

@media (min-width: $breakpoint-xs) {
    .image-data {
        display: flex;
        flex-flow: column;
        flex-basis: 100%;
    }
}

@media (min-width: $breakpoint-sm) {
    .image-data {
        display: flex;
        flex-flow: column;
        flex: 0;
    }
}

@media (min-width: $breakpoint-md) {
    .image-data {
        display: flex;
        flex-flow: column;
        flex: 0;
    }
}

@media (min-width: $breakpoint-lg) {
    .image-data {
        display: flex;
        flex-flow: column;
        flex: 0;
    }
}
</style>