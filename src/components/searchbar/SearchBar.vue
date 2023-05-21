<template>
    <q-select color="grey-8" bg-color="light-blue-1" 
        class="searchbar-sized"
        items-center filled
        clearable use-input hide-selected fill-input 
        input-debounce="500" 
        label="Search for given location"
        v-model="searchKeywords"
        :options="searchSuggestions"
        :loading="searchbarLoading"
        @filter="performSearch"
        @change="optionClick"
        ref="searchbar">
        

        <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" class="searchbar-sized">
                <q-item-section>
                    <q-item-label>{{ scope.opt.properties.geocoding.name }}</q-item-label>
                    <q-item-label class="ellipsis" caption>{{ scope.opt.properties.geocoding.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>

        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    No results
                </q-item-section>
            </q-item>
        </template>

    </q-select>
</template>


<script>
import axios from 'axios';

export default {
  name: 'SearchBar',
  emits: [],

  data() {
    return {
      searchKeywords: "",
      searchbarLoading: false,
      searchSuggestions: Array,
    };
  },

  methods: {
    performSearch: async function (val, update) {
    this.searchbarLoading = false;
      if (val.length == 0) {
        return;
      }

      let api_results = new Array;

      await axios
        .get(`https://nominatim.openstreetmap.org/search?q=${val}&format=geocodejson&accept-language=pl`)
        .then(
          function (response) {
            try {
              api_results = response.data.features;
            } catch (e) {
              alert(`Something went wrong, ${e}`, e);
            }
          }
        )
      update(() => {
        this.searchSuggestions = api_results;
      })
    },
    optionClick: function(val) {
        alert(val)
        this.searchKeywords = null;
    },
  },

  mounted() {
  },

};
</script>
<style scoped lang="scss">
.searchbar-sized {
    width: 300px;
    max-width: 300px;
}
</style>