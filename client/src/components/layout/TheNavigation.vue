<template>
    <nav>
        <div class="nav__background"></div>
        <div class="nav__content">
            <Logo />
            <ul class="row gap center">
                <p>
                    Refresh Token:
                    {{ shorten(useTokenStore().refreshToken || 'N/A') }}
                </p>
                <p>
                    Access Token:
                    {{ shorten(useTokenStore().accessToken || 'N/A') }}
                </p>
            </ul>
            <div class="user-actions">
                <button class="btn btn--diamond" @click="openSettingsModal">
                    <i class="icon icon--hammer"></i>
                </button>
                <button class="btn btn--diamond" @click="openUserModal">
                    <i class="icon icon--user"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { useTokenStore } from '@/stores/token-store';
import { shorten } from '@/utils/string-utils';
import { ref } from 'vue';
import Logo from '../Logo.vue';
import ConfirmModal from '../modals/templates/ConfirmModal.vue';
import InputModal from '../modals/templates/InputModal.vue';

const activePage = ref('home');

function openSettingsModal() {
    ModalController.open(ConfirmModal, {
        title: 'Settings',
        message: 'Settings modal opened',
        confirmText: 'Close',
        onConfirm: () => ModalController.close(),
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
    }

    .logo {
        margin-right: 8rem;
    }

    ul {
        color: var(--color-on-surface);
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
