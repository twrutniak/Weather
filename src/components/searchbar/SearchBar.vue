<template>
  <div class="search-bar-container">
    <q-spinner v-if="suggestionsLoading" color="primary" size="1.7rem" />
    <q-icon v-else name="search" size="1.7rem" color="primary" />
    <input v-model="searchKeywords" @input="handleInputDebounced" @click="openSuggestionsIfOpenable"
      placeholder="Start typing to search for location..." />

    <Transition name="fade">
      <div v-if="suggestionListOpen && suggestionList.length > 0" class="suggestion-list" @mouseleave="closeSuggestions">
        <div class="feature-wrapper" v-for="feature in suggestionList" v-bind:key="feature.id">
          <SearchbarSuggestion :feature-data="feature" @suggestion-click="onSuggesstionClick"></SearchbarSuggestion>
        </div>
      </div>
    </Transition>

  </div>
</template>


<script>
import axios from 'axios';
import { Notify } from 'quasar';
import debounce from 'lodash.debounce';
import SearchbarSuggestion from './SearchbarSuggestion.vue';

export default {
  name: 'SearchBar',
  emits: ['suggestion-click'],
  components: {
    'SearchbarSuggestion': SearchbarSuggestion
  },
  data() {
    return {
      searchKeywords: '',
      suggestionsLoading: false,
      suggestionListOpen: false,
      suggestionList: Array,
    };
  },
  methods: {
    handleInput: async function () {
      try {
        axios.get(
          process.env.VUE_APP_NOMINATIM_URL + `/search?q=${this.searchKeywords}&format=geocodejson&accept-language=pl`
        ).then(response => {
          this.suggestionList = response.data.features;
          this.suggestionsLoading = false;
          this.openSuggestions();
        });
      } catch (error) {
        Notify.create({
          message: 'Error!',
          caption: `Encountered an error while searching for ${this.searchKeywords}. 
                    Please try again later or contact our staff.`,
          color: 'negative'
        });
      }
    },

    handleInputDebounced: debounce(function () {
      this.suggestionsLoading = true;
      this.handleInput();
    }, 300),

    openSuggestions: function () {
      this.suggestionListOpen = true;
    },
    closeSuggestions: function () {
      this.suggestionListOpen = false;
    },
    onSuggesstionClick: function (featureData) {
      this.$emit('suggestion-click', featureData);
      this.closeSuggestions();
    },
    openSuggestionsIfOpenable: function () {
      if (this.suggestionList.length > 0) {
        this.openSuggestions();
        return;
      } else {
        return;
      }
    }
  },

  mounted() {
  },

};
</script>
<style scoped lang="scss">
.search-bar-container {
  display: flex;
  flex-flow: row-reverse;
  justify-content: center;
  align-items: center;

  border: 1px solid gray;
  background-color: rgb(255, 255, 255);
  border-radius: 2rem;

  padding: 5px 20px 5px 10px;

  width: 300px;
  height: 50px;
}

.search-bar-container input {
  height: 100%;
  flex: 1;
  color: rgba(12, 8, 8, 0.558);

  padding: 0 5px;

  outline: none;
  border: 0;
}

.suggestion-list {
  position: absolute;
  top: 90px;

  z-index: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 300px;
  max-height: 300px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media (min-width: $breakpoint-xs) {
  .suggestion-list {
    top: 90px;
  }
}

@media (min-width: $breakpoint-sm) {
  .suggestion-list {
    top: 90px;
  }
}

@media (min-width: $breakpoint-md) {
  .suggestion-list {
    top: 60px;
  }
}

@media (min-width: $breakpoint-lg) {
  .suggestion-list {
    top: 60px;
  }
}

.feature-wrapper {
  padding: 5px;
}

.suggestion-list::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.suggestion-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.suggestion-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.suggestion-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>