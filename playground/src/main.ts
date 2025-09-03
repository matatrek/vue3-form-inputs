import { createApp } from 'vue'
import './styles.css'
// import '@src/styles.css'
import App from './App.vue'
import VueInputPlugin from "@src/index";
// import i18n from '@src/plugins/i18n/i18n.ts';

const app = createApp(App);
// app.use(i18n);
app.use(VueInputPlugin, {});
// app.use(VueInputPlugin, {i18n});
app.mount("#app");
