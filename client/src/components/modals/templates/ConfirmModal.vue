<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader closeButton :closeButtonAction="onClickCancel">
                <h3>{{ props.title }}</h3>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="confirm">
                <p v-html="props.message"></p>

                <div class="row wrap gap center">
                    <button class="btn" @click="props.onConfirm">
                        <span>{{ props.confirmText || 'Yes' }}</span>
                    </button>
                    <button class="btn btn--primary" @click="onClickCancel">
                        <span>{{
                            props.cancelText || 'No, I changed my mind'
                        }}</span>
                    </button>
                </div>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import ModalFrame from '../ModalFrame.vue';
import ModalHeader from '../ModalHeader.vue';

const props = defineProps<{
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}>();

function onClickCancel() {
    props.onCancel ? props.onCancel() : ModalController.close();
}
</script>

<style scoped lang="scss">
.confirm {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    justify-content: space-between;
}
</style>
