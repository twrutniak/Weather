<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar class="main-toolbar">

      <q-toolbar-title>
        <q-avatar>
          <q-icon name="sunny" size="2rem" />
        </q-avatar>
        Weather
      </q-toolbar-title>

      <SearchBar @suggestion-click="onSuggesstionClick"></SearchBar>

      <q-space></q-space>

      <q-btn outline color="white" icon-right="favorite" label="Favorites" @click="toggleRightDrawer" />

    </q-toolbar>
  </q-header>
</template>


<script>
import SearchBar from './searchbar/SearchBar.vue';

export default {
  name: 'MainHeader',
  components: {
    'SearchBar': SearchBar
  },
  emits: ['toggle-right-drawer'],

  data() {
    return {
      rightDrawerOpen: false,
      searchKeywords: "",
      searchSuggestions: Array,
    };
  },

  methods: {
    toggleRightDrawer: function () {
      this.$emit('toggle-right-drawer');
    },
    onSuggesstionClick: function(featureData) {
      this.$emit('suggestion-click', featureData);
    }
  },

  mounted() {
  },

};
</script>
<style lang="scss" scoped>
.main-toolbar {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

@media (min-width: 0px) {
  .main-toolbar {
    flex-flow: column;
  }

  .main-toolbar>button,
  label {
    margin: 10px 0;
  }
}

@media (min-width: $breakpoint-md) {
  .main-toolbar {
    flex-flow: row;
  }
}
</style>