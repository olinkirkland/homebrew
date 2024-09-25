import mixpanel from 'mixpanel-browser';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
// import { initializeConnection } from './api/connection';
// import Divider from './components/Divider.vue';
import { router } from '@/router';

// initializeConnection();

// Create the app
const app = createApp(App);

// Components
// app.component('Divider', Divider);

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