import Vue from 'vue';
import VueRouter from 'vue-router';
import Inicio from '@/views/Inicio.vue';
import Login from '@/views/Login.vue';
import Pedidos from '@/views/Pedidos.vue';
import store from '@/store';
import toaster from '@/services/toaster';
import Relatorios from '@/views/Relatorios.vue';
import AlterarSenha from '@/views/AlterarSenha.vue';
import Usuarios from '@/views/Usuarios.vue';

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
    meta: { requireAuth: true },
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: Relatorios,
    meta: { requireAuth: true },
  },
  {
    path: '/alterar-senha',
    name: 'alterarSenha',
    component: AlterarSenha,
    meta: { requireAuth: true },
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: Usuarios,
    meta: { requireAuth: true, requireAdmin: true },
  },
];

// Inicializa e configura o controlador de rotas da aplicação.
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Função atribuída ao roteador, que inicializa o módulo de controle de estado de autenticação, e
// controla as permissões de acesso às páginas.
// Para as rotas que possuirem em seus dados "meta" o valor "true" em requireAuth, a função
// verificará se o usuário está autenticado antes de permitir o acesso à rota. Caso o usuário não
// esteja autenticado, ele será redirecionado à página de login.
// Para as rotas que possuem em seus dados "meta" o valor "true" em requireAdmin, a função
// verificará se o usuário é o administrador do sistema antes de permitir o acesso à rota. Caso o
// usuário não seja o administrado, ele será redirecionado à página "pedidos", onde será verificado
// novamente se ele está autenticado.
router.beforeEach(async ({ meta }, from, next) => {
  // Caso o módulo de estado de autenticação não tenha sido inicializado, o inicializa e aguarda
  // para continuar a operação de verificação de permissões.
  if (!store.getters['auth/isInitialized']) {
    await store.dispatch('auth/initialize');
  }

  // Verifica se o usuário está autenticado.
  if (meta.requireAuth && !store.getters['auth/isAuthenticated']) {
    // Exibe uma mensagem de erro caso o usuário não esteja autenticado.
    toaster.displayError('Você não está autenticado.');

    // Redireciona o usuário para a página de login.
    return next({ name: 'login' });
  }
  // Verifica se o usuário é o administrador.
  if (meta.requireAdmin && !store.getters['auth/isAdmin']) {
    // Exibe uma mensagem de erro caso o usuário não seja o administrador.
    toaster.displayError('Você não tem permissão.');

    // Redireciona o usuário para a página "pedidos".
    return next({ name: 'pedidos' });
  }

  // Permite o acesso à rota pretendida pelo usuário.
  return next();
});

export default router;
