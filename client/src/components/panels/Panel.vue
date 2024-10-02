<template>
    <div
        class="panel"
        :style="{
            'border-image-source': `url('assets/ui/${design}.png')`,
        }"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { PanelType } from './PanelType';

const props = defineProps({
    design: {
        type: String,
        default: PanelType.PanelBorder000,
    },
});
</script>

<style lang="scss">
@import '@/assets/scss/mixins.scss';

.panel {
    min-width: 6.4rem;
    min-height: 4rem;
    @include border-image-common('', 1);
}
</style>
