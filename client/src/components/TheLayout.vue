<template>
    <div class="layout">
        <TheNavigation />
        <div class="page-container">
            <router-view name="page"></router-view>
        </div>
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

    display: flex;
    flex-direction: column;
}

.page-container {
    flex: 1;
}
</style>
