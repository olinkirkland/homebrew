import mixpanel from 'mixpanel-browser';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import ModalController from './controllers/modal-controller';
import ConfirmModal from '@/components/modals/templates/ConfirmModal.vue';
import InputModal from './components/modals/templates/InputModal.vue';
// import { initializeConnection } from './api/connection';
// import Divider from './components/Divider.vue';
// import { router } from './router';

// initializeConnection();

// Create the app
const app = createApp(App);

// Components
// app.component('Divider', Divider);

// Plugins
const pinia = createPinia();
app.use(pinia);
// app.use(router);

app.mount('#app');

mixpanel.init('b370d90f461a2cd3c5d8f4bbd4e8907b');
if (window.location.hostname !== 'localhost') {
  console.warn('Mixpanel tracked the page load!');
  mixpanel.track('Page Load');
} else {
  console.warn('Accessing from localhost; Mixpanel is disabled.');
}

// Test a modal

// ModalController.open(ConfirmModal, {
//   title: 'Begin the test',
//   message: 'This is a test of the confirm modal.',
//   onConfirm: () => console.log('Confirmed!'),
//   // onCancel: () => console.log('Canceled!'),
//   confirmText: 'Yes',
//   cancelText: 'No',
// });

ModalController.open(InputModal, {
  title: 'Begin the test',
  message: 'This is a test of the input modal. Answer this question?',
  onConfirm: (value: string) => console.log('Confirmed!', value),
  // onCancel: () => console.log('Canceled!'),
  confirmText: 'Yes',
  cancelText: 'No',
  label: 'Your Answer',
});