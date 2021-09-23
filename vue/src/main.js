import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importa os arquivos de estilo da aplicação.
import './styles/app.scss';

// Inicializa a instância da aplicação Vue.
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
