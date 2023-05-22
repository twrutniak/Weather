<template>
  <q-layout view="hHh lpR fFf">

    <MainHeader
      @toggle-right-drawer="onToggleRightDrawer"
      @suggestion-click="onSuggestionClick"
    >
    </MainHeader>

    <FavoritesDrawer :drawer-open="rightDrawerOpen"></FavoritesDrawer>

    <q-page-container>
      {{ selectedFeature }}
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import FavoritesDrawer from './components/FavoritesDrawer.vue';
import constructWeatherURL from './helper_functions';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    'MainHeader': MainHeader,
    'FavoritesDrawer': FavoritesDrawer
  },

  data() {
    return {
      rightDrawerOpen: false,
      selectedFeature: Object,
    };
  },

  methods: {
    onToggleRightDrawer: function(state) {
      this.rightDrawerOpen = state;
    },
    onSuggestionClick: function(featureData) {
      this.selectedFeature = featureData;
      this.callWeatherAPI();
    },
    callWeatherAPI: function() {
      console.log(this.selectedFeature.geometry.coordinates);
      let url = constructWeatherURL(
        // API base URL
        process.env.VUE_APP_WEATHER_URL,
        // latitude
        this.selectedFeature.geometry.coordinates[0],
        // longitude
        this.selectedFeature.geometry.coordinates[1],
        // forecast days
        7,
      );
      axios.get(url).then(response => {
        console.log(response);
      });
    }
  },

};
</script>
