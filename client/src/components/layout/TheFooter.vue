<template>
    <footer>
        <Divider />
        <section>
            <p>
                &copy; {{ new Date().getFullYear() }} All rights reserved • Olin
                Kirkland
            </p>
        </section>
    </footer>
</template>

<script setup lang="ts">
import Divider from '../Divider.vue';
</script>

<style lang="scss">
footer {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    section {
        padding: 2rem;
        color: var(--color-on-surface);
        * {
            text-align: center;
            font-size: 1.2rem;
        }
    }
}
</style>
