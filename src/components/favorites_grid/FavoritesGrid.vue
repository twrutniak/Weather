<template>
  <section class="favorites-grid">
    <FavoritesTile :feature-data="{}"></FavoritesTile>
    <FavoritesTile :feature-data="{}"></FavoritesTile>
  </section>
</template>


<script>
import FavoritesTile from './FavoritesTile.vue';

export default {
  name: 'FavoritesGrid',
  props: {
  },

  components: {
    'FavoritesTile': FavoritesTile,
  },

  data() {
    return {
      drawerOpen: false,
    };
  },

  methods: {
  },

  mounted() {
  },

};
</script>
<style scoped lang="scss">
.favorites-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>