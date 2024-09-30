import { router } from '@/router';
import mixpanel from 'mixpanel-browser';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { addInterceptors } from './api/connection';
import App from './App.vue';

addInterceptors();

// Create the app
const app = createApp(App);

// Plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');

mixpanel.init('b370d90f461a2cd3c5d8f4bbd4e8907b');
if (window.location.hostname !== 'localhost') {
  console.warn('Mixpanel tracked the page load!');
  mixpanel.track('Page Load');
} else {
  console.warn('Accessing from localhost; Mixpanel is disabled.');
}