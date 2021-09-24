<template>
  <div>
    <div v-if="isLoading">Carregando aplicação...</div>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

/**
 * Layout App.
 * Layout da Single Page Application (SPA). Utilizado como container das páginas (através do
 * router-view), e como container das toasts.
 */
export default {
  name: 'App',

  computed: {
    // Valores computados provenientes do estado da aplicação.
    ...mapGetters({
      isLoading: 'auth/isLoading',
    }),
  },

  methods: {
    // Ações provenientes do estado da aplicação.
    ...mapActions({
      initAuth: 'auth/init',
    }),
  },

  mounted() {
    // Ao montar o componente, invoca a ação para inicializar o módulo de autenticação do estado da
    // aplicação.
    this.initAuth();
  },
};
</script>
