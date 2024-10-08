<template>
    <ModalFrame>
        <template v-slot:header>
            <ModalHeader>
                <h3>Error</h3>
            </ModalHeader>
        </template>
        <template v-slot:content>
            <div class="error">
                <h3>{{ message }}</h3>
                <button
                    class="btn btn--primary"
                    v-if="props.buttonLabel && props.onClickButton"
                    @click="props.onClickButton"
                >
                    <span>{{ props.buttonLabel }}</span>
                </button>
            </div>
        </template>
    </ModalFrame>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import ModalFrame from '../ModalFrame.vue';
import ModalHeader from '../ModalHeader.vue';

const props = defineProps({
    message: {
        type: String,
        default: 'Something went wrong.',
    },
    buttonLabel: {
        type: String,
        default: 'Ok',
    },
    onClickButton: {
        type: Function as PropType<(event: MouseEvent) => void>,
        default: () => {},
    },
});
const message = ref(props.message);
</script>

<style scoped lang="scss">
.error {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    justify-content: space-between;
}
</style>
