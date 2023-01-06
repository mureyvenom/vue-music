import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ValidatePlugin from '@/plugins/validations';
import { auth } from '@/utils/firebase';
import i18n from './utils/i18n';
// import globalComponents from './plugins/globalComponents';

import './assets/main.css';

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(ValidatePlugin);
    app.use(i18n);
    // app.use(globalComponents);
    app.mount('#app');
  }
});
