<template>
    <div class="input-field">
        <div class="input-field__background"></div>
        <input
            type="text"
            :placeholder="placeholder"
            :value="props.modelValue"
            @input="(event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    placeholder: {
        type: String,
        default: '...',
    },
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins.scss';

.input-field {
    position: relative;
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    z-index: 0;
    padding: 0 1.6rem;

    > input {
        height: fit-content;
        font-size: 1.4rem;
        background-color: transparent;
        color: var(--handwriting);
        font-family: var(--handwriting-font);
        text-transform: uppercase;
        width: 100%;
        border: none;
        outline: none;
    }

    > .input-field__background {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 1.2rem;
        height: 1.2rem;
        @include border-image-common('border/panel-border-014', 0);
    }
}
</style>
