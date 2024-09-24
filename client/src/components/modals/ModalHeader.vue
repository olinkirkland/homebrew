<template>
    <div class="modal__header">
        <slot></slot>
        <button class="btn-icon close" v-if="closeButton" @click="onClickClose">
            <i class="icon icon--close"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';

const props = defineProps({
    closeButton: Boolean,
    closeButtonAction: Function,
});

function onClickClose() {
    props.closeButtonAction
        ? props.closeButtonAction()
        : ModalController.close();
}
</script>

<style lang="scss" scoped>
.modal__header {
    display: flex;
    justify-content: center;
    background-color: var(--dark);
    align-items: center;
    border-bottom: 1px solid var(--dark-2);
    width: 100%;
    min-height: 5.2rem;
    padding: 2rem 2rem 1.2rem 2rem;
    gap: 1.6rem;

    > button.close {
        filter: invert(1);
    }
}
</style>
