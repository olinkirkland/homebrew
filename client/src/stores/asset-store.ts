import LoadingModal from '@/components/modals/templates/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
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

        for (const assetMetadata of assets.value) {
            ModalController.open(LoadingModal, {
                message: null, progress: assets.value.indexOf(assetMetadata) / assets.value.length, opaque: true
            });
            assetMetadata.isLoaded = false;
            try {
                // Is it cached in the browser?
                if (caches) {
                    const cache = await caches.open('assets');
                    const cachedResponse = await cache.match(assetMetadata.path);
                    if (cachedResponse) {
                        assetMetadata.isLoaded = true;
                        continue;
                    }
                }

                const asset = await preloadAsset(assetMetadata.path);
                if (caches) {
                    const cache = await caches.open('assets');
                    cache.put(assetMetadata.path, new Response(asset as BodyInit));
                }

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

async function preloadAsset(path: string) {
    return new Promise((resolve, reject) => {
        const asset = new Image();
        asset.onload = () => resolve(asset);
        asset.onerror = reject;
        asset.src = path;
    });
}