<template>
  <div>
    <div v-if="isLoading">Carregando aplicação...</div>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',

  computed: {
    ...mapGetters({
      isLoading: 'auth/isLoading',
    }),
  },

  methods: {
    ...mapActions({
      initAuth: 'auth/init',
    }),
  },

  mounted() {
    this.initAuth();
  },
};
</script>
