<template>
    <div
        class="panel"
        :class="{
            'panel--dark': mode === 'dark',
            'panel--light': mode === 'light',
        }"
    >
        <div
            class="panel__background"
            :style="{
                'border-image-source': `url('assets/ui/${design}')`,
            }"
        ></div>
        <div class="panel__content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PanelType } from './PanelType';

const props = defineProps({
    design: {
        type: String,
        default: PanelType.PanelBorder000,
    },
    mode: {
        type: String, // 'light' | 'dark',
        default: 'light',
    },
});
</script>

<style lang="scss">
@import '@/assets/scss/mixins.scss';

.panel {
    position: relative;
    min-width: 6.4rem;
    min-height: 4rem;
    padding: 1.6rem;
    width: fit-content;

    > .panel__background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    > .panel__content {
        position: relative;
    }

    &--dark {
        .panel__background {
            @include border-image-common('', 1);
        }

        & > * {
            color: var(--color-on-surface);
        }
    }

    &--light {
        .panel__background {
            @include border-image-common('', -1);
        }
        & > * {
            color: var(--color-surface);
        }
    }
}
</style>
