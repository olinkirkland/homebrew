<template>
    <div class="page">
        <h1>404</h1>
        <p>This page does not exist.</p>
        <button class="btn" @click="onClickGoHome()">
            Return to Home Page
        </button>
    </div>
</template>

<script setup lang="ts">
import { router } from '@/router';
function onClickGoHome() {
    router.push('/');
}
</script>

<style lang="scss" scoped>
</style>
