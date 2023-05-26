<template>
    <article glossy class="favorite-tile">
        <q-btn glossy rounded color="primary" text-white class="content"></q-btn>
    </article>
</template>
  
  
<script>
export default {
    name: 'FavoritesTile',
    props: {
        featureData: {type: Object, required: true},
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
.favorite-tile {
    display: flex;
    flex-flow: column;
    flex-basis: 50%;

    aspect-ratio: 1/1;

    padding: 15px;
}
.favorite-tile .content {

    width: 100%;
    height: 100%;

    // background-color: $primary;
    // border: 1px solid black;
    // border-radius: 25px;
}
</style>