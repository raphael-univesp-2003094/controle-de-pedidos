import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

// Instala o plugin Vuex (controlador de estado) na aplicação Vue.
Vue.use(Vuex);

// Inicializa e configura o controlador de estado da aplicação.
const store = new Vuex.Store({
  modules: {
    auth,
  },
});

export default store;
