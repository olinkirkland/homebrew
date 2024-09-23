<template>
    <div class="modal">
        <slot name="header"></slot>
        <div class="modal__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.modal {
    display: flex;
    flex-direction: column;
    animation: animate-in 0.2s ease;
    min-width: 36rem;
    max-width: 48rem;
    background-color: var(--surface);
    border: 1px solid var(--on-surface);
    color: var(--on-surface);
    overflow: hidden;
    box-shadow: var(--shadow);

    @include border-image-common(
        'panel/panel-008',
        0
    );

    .modal__content {
        display: flex;
        padding: 2rem;
        flex: 1;
        max-width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
}

:deep(.modal__content > div) {
    width: 100%;
}

:deep(section:last-of-type) {
    padding-bottom: 2rem;
}

@media (max-width: 768px) {
    .modal {
        border: none;
    }
}
</style>
