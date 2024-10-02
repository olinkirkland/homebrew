<template>
    <div class="page">
        <div>
            <Panel :design="PanelType.PanelBorder000">
                <h1>Hello world</h1>
                <p>This is a test</p>
            </Panel>
        </div>
        <div class="background">
            <div class="pattern"></div>
            <div class="color"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Panel from '../panels/Panel.vue';
import { PanelType } from '../panels/PanelType';
</script>

<style lang="scss">
.background {
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;

    > .pattern {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url('/assets/images/floral.jpg');
        opacity: 0.05;
        background-repeat: repeat;
        background-size: 40rem;
        z-index: 1;
    }

    > .color {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--color-on-surface);
    }
}
</style>
