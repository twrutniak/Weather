<template>
  <q-layout view="hHh lpR fFf">

    <MainHeader
      @toggle-right-drawer="onToggleRightDrawer"
    >
    </MainHeader>

    <FavoritesDrawer :drawer-open="rightDrawerOpen"></FavoritesDrawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import FavoritesDrawer from './components/FavoritesDrawer.vue';

export default {
  name: 'App',
  components: {
    'MainHeader': MainHeader,
    'FavoritesDrawer': FavoritesDrawer
  },

  data() {
    return {
      rightDrawerOpen: false,
    };
  },

  methods: {
    onToggleRightDrawer: function(state) {
      this.rightDrawerOpen = state;
    },
  },

};
</script>
