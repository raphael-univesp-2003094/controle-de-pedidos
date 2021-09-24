<template>
  <div>
    <router-view v-if="isInitialized"/>
    <div v-else>Iniciando aplicação...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
      isInitialized: 'auth/isInitialized',
    }),
  },
};
</script>
