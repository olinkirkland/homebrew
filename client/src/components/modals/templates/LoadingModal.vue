<template>
    <div class="loading">
        <Logo />
        <h3>{{ message }}</h3>
        <div v-if="progress >= 0" class="progress-bar">
            <div
                class="progress-bar__fill"
                :style="{ width: `${progress * 100}%` }"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import { ref } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: 'Loading...',
    },
    progress: {
        type: Number,
        default: -1,
    },
});
const message = ref(props.message);
</script>

<style scoped lang="scss">
.loading {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--color-surface);
    .logo {
        margin-bottom: 0.4rem;
    }
}

.progress-bar {
    position: absolute;
    top: calc(100% + 0.2rem);
    width: 100%;
    height: 0.2rem;
    background-color: rgba(0, 0, 0, 0.1);
    transition: width 0.2s ease;

    &__fill {
        height: 100%;
        background-color: var(--color-on-surface-inverted);
    }
}
</style>
