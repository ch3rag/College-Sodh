import Vue from 'vue';
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(RichTextEditorPlugin);

Vue.mixin({
  methods: {
    readFileAsUrl(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = reject;
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      });
    },
  },
});
