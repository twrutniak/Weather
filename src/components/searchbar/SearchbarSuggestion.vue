<template>
    <article class="feature" @click="suggestionClick">
        <div class="name">{{ featureData.properties.geocoding.name }}</div>
        <div class="description">{{ featureData.properties.geocoding.label }}</div>
    </article>
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
        console.log(this.$props.featureData)
    },

};
</script>

<style scoped lang="scss">
.feature {
    display: flex;
    flex-flow: column;
    padding: 5px;
    background-color: white;

    border: 2px solid $primary;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.feature:hover {
    background-color: rgb(236, 232, 232);
}

.feature .name {
    color: rgb(0, 0, 0);
    font-size: 1rem;
}

.feature .description {
    color: rgb(83, 79, 79);
    font-size: 0.725rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

</style>