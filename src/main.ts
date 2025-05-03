import { createApp } from 'vue'
import './styles.css'
import App from './App.vue'
import VueInputPlugin from "./index";
import i18n from './plugins/i18n/i18n.ts';

const app = createApp(App);
app.use(i18n);
app.use(VueInputPlugin, {i18n});
app.mount("#app");
