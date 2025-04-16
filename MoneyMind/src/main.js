import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { addIcons } from 'ionicons';
import { 
  personOutline, idCardOutline, timeOutline, 
  fingerPrintOutline, keyOutline, lockOpenOutline,
  notificationsOutline, languageOutline, helpCircleOutline, logOutOutline 
} from 'ionicons/icons';
addIcons({
  'person-outline': personOutline,
  'id-card-outline': idCardOutline,
  'time-outline': timeOutline,
  'finger-print-outline': fingerPrintOutline,
  'key-outline': keyOutline,
  'lock-open-outline': lockOpenOutline,
  'notifications-outline': notificationsOutline,
  'language-outline': languageOutline,
  'help-circle-outline': helpCircleOutline,
  'log-out-outline': logOutOutline,
});

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Eliminar la referencia al modo oscuro */
 // import '@ionic/vue/css/palettes/dark.system.css'; // Comentar o eliminar esta línea

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  // Forzar el modo claro
  document.body.classList.remove('dark');
  document.body.classList.add('light'); // Asegura el modo claro
  app.mount('#app');
});
