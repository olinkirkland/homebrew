<template>
    <div class="app-layout theme-light">
        <TheLayout />
        <div class="app-layout__content">
            <router-view name="page"></router-view>
        </div>
    </div>
    <TheModalContainer />
</template>

<script setup lang="ts">
import TheLayout from './components/TheLayout.vue';
import TheModalContainer from './components/modals/TheModalContainer.vue';
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/styles.scss';
@import './assets/scss/markdown-styles.scss';
@import './assets/scss/themes/theme-light.scss';
@import './assets/scss/themes/theme-dark.scss';

.app-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    min-height: 100vh; // Old browsers
    min-height: 100dvh; // New browsers
    min-height: -webkit-fill-available; // iOS
    max-height: 100vh; // Old browsers
    max-height: 100dvh; // New browsers
    max-height: -webkit-fill-available; // iOS
    > .app-layout__content {
        flex: 1;
        overflow: hidden;
        display: flex;
    }
}
</style>
