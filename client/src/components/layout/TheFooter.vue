<template>
    <footer>
        <section>
            <p>
                &copy; {{ new Date().getFullYear() }} All rights reserved • Olin
                Kirkland
            </p>
        </section>
    </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
footer {
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
