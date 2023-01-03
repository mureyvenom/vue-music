import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ValidatePlugin from '@/plugins/validations';
import '@/utils/firebase';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ValidatePlugin);

app.mount('#app');
