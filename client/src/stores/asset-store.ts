import LoadingModal from '@/components/modals/templates/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
import { wait } from '@/utils/browser-utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type AssetMetadata = {
    name: string;
    path: string;
    type: string;
    size: number;
    isLoaded: boolean;
}

export const useAssetStore = defineStore('assets', () => {
    // Responsible for preloading assets such as images, sounds, etc.
    const assets = ref([] as AssetMetadata[]);
    const isLoaded = ref(false);

    const preloadAssets = async () => {
        const assetsIndexPath = '/asset-index.json';
        assets.value = await fetch(assetsIndexPath).then(res => res.json());
        // Check the cache
        


        for (const assetMetadata of assets.value) {
            ModalController.open(LoadingModal, { message: `Loading assets... (${assets.value.indexOf(assetMetadata) + 1}/${assets.value.length})` });
            assetMetadata.isLoaded = false;
            try {
                await preloadAsset(assetMetadata.path);
                assetMetadata.isLoaded = true;
            } catch (error) {
                console.error('Error preloading asset', assetMetadata.path, error);
            }
        }
        ModalController.close();
    };

    return {
        assets,
        isLoaded,
        preloadAssets,
    };
});

function preloadAsset(path: string) {
    return new Promise((resolve, reject) => {
        const asset = new Image();
        asset.onload = resolve;
        asset.onerror = reject;
        asset.src = path;
    });
}