<template>
    <div class="layout">
        <TheNavigation />
        <div class="page-container"></div>
        <TheFooter />
    </div>
</template>

<script setup lang="ts">
import TheFooter from './layout/TheFooter.vue';
import TheNavigation from './layout/TheNavigation.vue';
</script>

<style lang="scss">
.layout {
    width: 100%;
    height: 100vh;
    background-image: url('assets/images/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
}

.page-container {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
