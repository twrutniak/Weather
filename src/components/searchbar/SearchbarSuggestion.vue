<template>
    <q-btn class="feature" color="primary" no-caps  @click="suggestionClick">
        <div>
            <span class="name" text-white>{{ featureData.properties.geocoding.name }}</span><br>
            <span class="description">{{ featureData.properties.geocoding.label }}</span>
        </div>
    </q-btn>
</template>
  
  
<script>
export default {
    name: 'SearchBar',
    props: {
        featureData: { type: Object, required: true },
    },
    emits: ['suggestion-click'],

    data() {
    },

    methods: {
        suggestionClick: function () {
            this.$emit('suggestion-click', this.$props.featureData);
        }
    },

    mounted() {
    },

};
</script>

<style scoped lang="scss">
.feature {
    width: 280px;
    display: flex;
    flex-flow: column;
}

.q-btn__content {
    display: flex;
    flex-flow: column;
}

.feature:hover {
    background-color: rgb(236, 232, 232);
}

.feature .name {
    font-size: 1rem;
}

.feature .description {
    color: rgb(234, 223, 223);
    font-size: 0.725rem;
    text-overflow: ellipsis;
    overflow: hidden;
}

</style>