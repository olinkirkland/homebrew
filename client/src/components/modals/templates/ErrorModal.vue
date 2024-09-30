<template>
    <div class="error modal">
        <h3>{{ message }}</h3>
        <button
            class="btn btn--primary"
            v-if="props.buttonLabel && props.onClickButton"
            @click="props.onClickButton"
        >
            <span>{{ props.buttonLabel }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: 'Something went wrong.',
    },
    buttonLabel: {
        type: String,
        default: 'Ok',
    },
    onClickButton: {
        type: Function as PropType<(event: MouseEvent) => void>,
        default: () => {},
    },
});
const message = ref(props.message);
</script>

<style scoped lang="scss">
.error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--color-on-surface);
    border: 1px solid var(--color-on-surface);
    backdrop-filter: blur(5px);
    padding: 2rem 4rem;
    gap: 2rem;
}
</style>
