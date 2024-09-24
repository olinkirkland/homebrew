<template>
    <div class="layout">
        <button class="btn btn--primary" @click="onClickButton1">
            <span>Open Modal One</span>
        </button>
        <button class="btn btn--primary" @click="onClickButton2">
            <span>Open Modal Two</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import ConfirmModal from '@/components/modals/templates/ConfirmModal.vue';
import InputModal from '@/components/modals/templates/InputModal.vue';
import ModalController from '@/controllers/modal-controller';

function onClickButton1() {
    ModalController.open(InputModal, {
        title: 'Begin the test',
        message: 'This is a test of the input modal. Answer this question?',
        onConfirm: (value: string) => console.log('Confirmed!', value),
        // onCancel: () => console.log('Canceled!'),
        confirmText: 'Yes',
        cancelText: 'No',
        label: 'Your Answer',
        closeOnClick: true,
    });
}

function onClickButton2() {
    ModalController.open(ConfirmModal, {
        title: 'Begin the test',
        message: 'This is a test of the confirm modal.',
        onConfirm: () => console.log('Confirmed!'),
        // onCancel: () => console.log('Canceled!'),
        confirmText: 'Yes',
        cancelText: 'No',
    });
}
</script>

<style lang="scss">
.layout {
    width: 100%;
    height: 100vh;
    background-image: url('assets/images/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>
