<template>
  <section class="favorites-grid">
    <FavoritesTile 
      v-for="feature in featureArray" :key="feature" :selected-feature="feature"
      @favorite-tile-selected="onFavoriteTileSelected" 
      @favorite-tile-removed="onFavoriteTileRemoved">
    </FavoritesTile>
  </section>
</template>


<script>
import { getWeatherFavorites, removeWeatherFavorite } from '@/helper_functions';
import FavoritesTile from './FavoritesTile.vue';

export default {
  name: 'FavoritesGrid',
  emits: ['favoriteTileSelected'],
  props: {
  },

  components: {
    'FavoritesTile': FavoritesTile,
  },

  data() {
    return {
      featureArray: [],
    };
  },

  methods: {
    onFavoriteTileSelected: function (data) {
      this.$emit('favoriteTileSelected', data);
    },
    onFavoriteTileRemoved: function(data) {
      this.deleteFavorite(data);
      this.reloadFavorites();
    },
    reloadFavorites: function () {
      this.featureArray = getWeatherFavorites();
    },
    deleteFavorite: function (element) {
      removeWeatherFavorite(element);
      this.reloadFavorites();
    },
  },

  mounted() {
    this.reloadFavorites();
  },

};
</script>
<style scoped lang="scss">
.favorites-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>