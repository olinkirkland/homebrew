<template>
    <nav>
        <div class="row center gap">
            <Logo />
            <ul class="row gap">
                <li>
                    <button
                        class="btn btn--nav"
                        :class="{ active: activePage === 'home' }"
                        @click="activePage = 'home'"
                    >
                        <span>Home</span>
                    </button>
                </li>

                <li>
                    <button
                        class="btn btn--nav"
                        :class="{ active: activePage === 'play' }"
                        @click="activePage = 'play'"
                    >
                        <span>Play</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Logo from '../Logo.vue';

const activePage = ref('home');
</script>

<style lang="scss">
nav {
    height: 6.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.4rem;
    background-color: var(--color-surface);
}
</style>
