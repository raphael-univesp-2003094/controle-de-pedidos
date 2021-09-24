import Vue from 'vue';
import VueRouter from 'vue-router';
import Inicio from '../views/Inicio.vue';
import Login from '../views/Login.vue';
import Pedidos from '../views/Pedidos.vue';

Vue.use(VueRouter);

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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
