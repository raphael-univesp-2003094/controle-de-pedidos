import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

// Importa os arquivos de estilo da aplicação.
import './styles/app.scss';

// Define um interceptador de requisições para o axios, que configura automaticamente o cabeçalho
// 'Authorization' caso haja um token de acesso salvo no armazenamento local e caso o cabeçalho
// ainda não esteja definido.
axios.interceptors.request.use((config) => {
  // Faz uma cópia da configuração da requisição.
  const newConfig = config;

  // Busca no armazenamento local o token de acesso.
  const accessToken = localStorage.getItem('accessToken');

  // Define o cabeçalho 'Authorization' caso haja um token de acesso salvo no armazenamento local e
  // caso o cabeçalho ainda não esteja definido.
  if (accessToken && !config.headers.Authorization) {
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Retorna a cópia da configuração da requisição, ja reconfigurada.
  return newConfig;
});

// Inicializa a instância da aplicação Vue.
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
