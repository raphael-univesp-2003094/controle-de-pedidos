import Vue from 'vue';
import VueRouter from 'vue-router';
import Inicio from '../views/Inicio.vue';
import Login from '../views/Login.vue';
import Pedidos from '../views/Pedidos.vue';

// Instala o plugin VueRouter (controlador de rotas) na aplicação Vue.
Vue.use(VueRouter);

// Define as rotas da aplicação.
const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: Pedidos,
  },
];

// Inicializa e configura o controlador de rotas da aplicação.
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
