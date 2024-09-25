<template>
    <nav>
        <div class="nav__background"></div>

        <div class="nav__content">
            <Logo />
            <ul class="row gap">
                <li>
                    <button
                        class="btn btn--nav"
                        :class="{ active: activePage === 'home' }"
                        @click="activePage = 'home'"
                    >
                        <span>Home</span>
                    </button>
                </li>

                <li>
                    <button
                        class="btn btn--nav"
                        :class="{ active: activePage === 'play' }"
                        @click="activePage = 'play'"
                    >
                        <span>Play</span>
                    </button>
                </li>

                <li>
                    <button
                        class="btn btn--nav"
                        :class="{ active: activePage === 'design' }"
                        @click="activePage = 'design'"
                    >
                        <span>Design</span>
                    </button>
                </li>
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

        <Divider />
    </nav>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { ref } from 'vue';
import Divider from '../Divider.vue';
import Logo from '../Logo.vue';
import ConfirmModal from '../modals/templates/ConfirmModal.vue';

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
    console.log('User modal opened');
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
            rgba(0, 0, 0, 0.2) 100%
        );
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
