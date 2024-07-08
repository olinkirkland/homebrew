import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');

let didShowMessage = false;

function showMessage() {
    const message = 'I like logs';

    for (let i = 0; i < 5; i++) {
        console.log(message);
    }
}

showMessage();
