<template>
    <footer>
        <Divider />
        <section>
            <p>&copy; {{ new Date().getFullYear() }} - All rights reserved</p>
        </section>
    </footer>
</template>

<script setup lang="ts">
import Divider from '../Divider.vue';
</script>

<style lang="scss">
footer {
    background-color: rgba(0, 0, 0, 0.6);
    section {
        padding: 2rem;
        color: var(--color-on-surface);
        * {
            font-size: 1.2rem;
        }
    }
}
</style>
