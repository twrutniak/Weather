<template>
    <Transition name="fade">
        <div class="loading-overlay" v-if="overlayOpen">
            <q-spinner color="primary" size="3em" />
        </div>
    </Transition>
</template>
  
<script>

export default {
    name: 'LoadingOverlay',
    components: {
    },

    data() {
        return {
            overlayOpen: false,
        }
    },

    methods: {
        openOverlay: function () {
            this.overlayOpen = true;
        },
        closeOverlay: function () {
            this.overlayOpen = false;
        },
    },

};
</script>
<style scoped lang="scss">
.loading-overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
}
</style>