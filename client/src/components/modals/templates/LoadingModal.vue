<template>
    <div class="loading">
        <Logo />
        <h3>{{ message }}</h3>
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
});
const message = ref(props.message);
</script>

<style scoped lang="scss">
.loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--color-on-surface);
}
</style>
