import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ValidatePlugin from '@/plugins/validations';
import { auth } from '@/utils/firebase';

import './assets/main.css';

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(ValidatePlugin);

    app.mount('#app');
  }
});
