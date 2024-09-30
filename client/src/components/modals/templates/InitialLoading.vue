<template>
    <div class="initial-loading">
        <Logo />
        <img src="@/assets/logo.png" />
    </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
</script>

<style scoped lang="scss">
.initial-loading {
    width: 100%;
    height: 100vh;
    background: repeating-linear-gradient(
        45deg,
        rgba(60, 60, 80),
        rgb(60, 60, 80) 1rem,
        rgba(65, 65, 90) 1rem,
        rgb(65, 65, 90) 2rem
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-on-surface);

    img {
        width: 4rem;
        height: 4rem;

        // Fade in
        animation: fadeIn 1s;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
