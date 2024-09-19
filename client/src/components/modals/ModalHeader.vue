<template>
  <div class="modal__header">
    <slot></slot>
    <button class="btn--icon" v-if="closeButton" @click="onClickClose">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';

const props = defineProps({
  closeButton: Boolean,
  closeButtonAction: Function
});

function onClickClose() {
  props.closeButtonAction ? props.closeButtonAction() : ModalController.close();
}
</script>

<style lang="scss" scoped>
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark);
  border-bottom: 1px solid var(--dark-2);
  width: 100%;
  min-height: 5.2rem;
  padding: 0 2rem;
  gap: 1.6rem;
}
</style>
