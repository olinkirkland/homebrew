import { ref } from 'vue';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';
import { createGuestAccount } from './api/account';
import { fetchAccessToken } from './api/connection';
import ErrorModal from './components/modals/templates/ErrorModal.vue';
import LoadingModal from './components/modals/templates/LoadingModal.vue';
import TheHomePage from './components/pages/TheHomePage.vue';
import TheLostPage from './components/pages/TheLostPage.vue';
import ModalController from './controllers/modal-controller';
import { useAssetStore } from './stores/asset-store';
import { useTokenStore } from './stores/token-store';
import { reloadPage, wait } from './utils/browser-utils';

export const currentPageName = ref();
export enum PageName {
    HOME = 'home',
    GAMES = 'games',
    GAME = 'game',
    INVITE = 'invite',
    SETTINGS = 'settings',
    LOST = 'lost'
}

const routes = [
    {
        path: '/',
        components: {
            page: TheHomePage
        },
        name: PageName.HOME
    },
    {
        path: '/game/:id',
        components: {
            // page: TheGamePage
        },
        name: PageName.GAME
    },
    {
        path: '/invite/:code',
        components: {
            // page: TheInvitePage
        },
        name: PageName.INVITE
    },
    {
        path: '/:pathMatch(.*)*',
        components: {
            page: TheLostPage // 404 page
        },
        name: PageName.LOST
    }
];

const routerOptions = {
    history: createWebHistory(),
    routes
};

export const router = createRouter(routerOptions as RouterOptions);

router.afterEach(async (to, from) => { });

router.beforeEach(async (to, from, next) => {
    // Before each route change, try to preload the assets if they're not already loaded
    if (!useAssetStore().isLoaded) {
        await useAssetStore().preloadAssets();
    }

    // Before each route change, check if there's an access token
    // If not, create a new guest account
    if (!useTokenStore().accessToken) {
        ModalController.open(LoadingModal, { message: 'Connecting...' });

        let response;
        if (!useTokenStore().refreshToken) {
            response = await createGuestAccount(); // Gets a new, guest refresh token
        }
        else {
            try {
                response = await fetchAccessToken(); // Gets a new access token using the refresh token
            } catch (error) {
                console.error(error);
            }
        }

        await wait(0.4);
        if (response) {
            ModalController.close();
        } else {
            await wait(0.4);
            ModalController.open(ErrorModal, {
                message: 'Failed to connect.', buttonLabel: 'Reload', onClickButton: reloadPage
            });
        }
    }

    // if (useUserStore().isGuest && !from.name)
    //   ModalController.open(GuestReminderModal);

    currentPageName.value = to.name;

    next();
});
