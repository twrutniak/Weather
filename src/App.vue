<template>
  <q-layout view="hHh lpR fFf">

    <MainHeader @toggle-right-drawer="onToggleRightDrawer" @suggestion-click="onSuggestionClick">
    </MainHeader>

    <q-drawer class="favorites-drawer" v-model="rightDrawerOpen" side="right" bordered>
      <FavoritesGrid></FavoritesGrid>
    </q-drawer>


    <q-page-container>
      <q-page  class="main-page">
      <Transition name="fade">
        <div v-if="weatherDataVisible" class="container-wrapper">
          <WeatherTile  :feature-data="selectedFeature"
                        :weather-data="selectedFeatureWeatherData">
          </WeatherTile>
        </div>
      </Transition>
      </q-page>

      <LoadingOverlay ref="loading-overlay"></LoadingOverlay>

    </q-page-container>

  </q-layout>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import FavoritesGrid from './components/favorites_grid/FavoritesGrid.vue';
import axios from 'axios';
import { constructWeatherURL } from '@/helper_functions';
import LoadingOverlay from './components/LoadingOverlay.vue';
import WeatherTile from './components/data_presentation/WeatherTile.vue';

export default {
  name: 'App',
  components: {
    'MainHeader': MainHeader,
    'LoadingOverlay': LoadingOverlay,
    'WeatherTile': WeatherTile,
    'FavoritesGrid': FavoritesGrid
  },

  data() {
    return {
      rightDrawerOpen: false,
      selectedFeature: Object,
      selectedFeatureWeatherData: Object,
      weatherDataVisible: false,
    };
  },

  methods: {
    displayWeatherData: function () {

    },
    onToggleRightDrawer: function () {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },

    onSuggestionClick: async function (featureData) {
      this.selectedFeature = featureData;
      this.$refs['loading-overlay'].openOverlay();
      await this.callWeatherAPI();
      this.$refs['loading-overlay'].closeOverlay();
      this.weatherDataVisible = true;
    },

    callWeatherAPI: async function () {
      let url = constructWeatherURL(
        // API base URL
        process.env.VUE_APP_WEATHER_URL,
        // latitude
        this.selectedFeature.geometry.coordinates[1],
        // longitude
        this.selectedFeature.geometry.coordinates[0],
        // forecast days
        7,
      );
      await axios.get(url).then(response => {
        this.selectedFeatureWeatherData = response.data;
      });
    }
  },
  mounted: function () {
  },

};
</script>
<style scoped lang="scss">
.main-page {
  background-color: $indigo-1;
}
@media (min-width: 0px) {
  .container-wrapper {
    padding: 10px 10px 0 10px;
  }
}
@media (min-width: $breakpoint-xs) {
  .container-wrapper {
    padding: 10px 10px 0px 10px;
  }
}

@media (min-width: $breakpoint-sm) {
  .container-wrapper {
    padding: 50px 50px 0px 50px;
  }
}

@media (min-width: $breakpoint-md) {
  .container-wrapper {
    padding: 50px 50px 0px 50px;
  }
}

@media (min-width: $breakpoint-lg) {
  .container-wrapper {
    padding: 50px 50px 0px 50px;
  }
}
</style>