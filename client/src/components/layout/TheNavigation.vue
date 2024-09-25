<template>
    <nav>
        <div class="nav__background"></div>

        <div class="nav__content">
            <Logo />
            <ul class="row gap center"></ul>
            <div class="user-actions">
                <button class="btn btn--diamond" @click="openSettingsModal">
                    <i class="icon icon--hammer"></i>
                </button>
                <button class="btn btn--diamond" @click="openUserModal">
                    <i class="icon icon--user"></i>
                </button>
            </div>
        </div>

        <Divider />
    </nav>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { ref } from 'vue';
import Divider from '../Divider.vue';
import Logo from '../Logo.vue';
import ConfirmModal from '../modals/templates/ConfirmModal.vue';
import InputModal from '../modals/templates/InputModal.vue';

const activePage = ref('home');

function openSettingsModal() {
    ModalController.open(ConfirmModal, {
        title: 'Settings',
        message: 'Settings modal opened',
        confirmText: 'Close',
        confirmAction: () => ModalController.close(),
    });
}

function openUserModal() {
    ModalController.open(InputModal, {
        title: 'My Profile',
        message: 'Please enter a new username.',
        cancelText: 'Cancel',
        confirmText: 'Save',
        confirmAction: () => ModalController.close(),
        label: 'Username',
        inputPlaceholder: 'e.g. John Doe',
        onConfirm: (input: string) => {
            console.log('User input:', input);
        },
    });
}
</script>

<style lang="scss">
@import '@/assets/scss/mixins.scss';

nav {
    position: relative;
    height: 6.4rem;
    padding: 0 2.4rem;
    z-index: 1;

    .nav__content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        height: 100%;
    }

    .nav__background {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // Gradient black top down
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.4) 100%
        );
        backdrop-filter: blur(10px);
    }

    .logo {
        margin-right: 8rem;
    }

    .user-actions {
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 2.4rem;
        top: 1.6rem;
    }
}
</style>
