<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand">
        Controle de Pedidos
      </span>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/pedidos" active-class="active">
              <i class="bi bi-card-list"></i>
              Pedidos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/relatorios" active-class="active">
              <i class="bi bi-clipboard-data"></i>
              Relatórios
            </router-link>
          </li>

          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/usuarios" active-class="active">
              <i class="bi bi-people"></i>
              Usuários
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/alterar-senha" active-class="active">
              <i class="bi bi-key"></i>
              Alterar Senha
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <b class="nav-link">
              <i class="bi bi-person"></i>
              {{ usuario ? usuario["nome"] : '' }}
            </b>
          </li>

          <li class="nav-item">
            <a class="nav-link c-pointer" @click="doLogout">
              <i class="bi bi-box-arrow-in-left"></i>
              Sair
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

/**
 * Componente NavBar.
 * Componente de navegação que pode ser utilizado apenas quando o usuário está autenticado.
 * O componente possui links para navegação para todas as páginas da aplicação que necessitam de
 * autenticação.
 */
export default {
  name: 'NavBar',

  computed: {
    // Valores calculados provenientes do estado da aplicação.
    ...mapGetters({
      isAdmin: 'auth/isAdmin',
      usuario: 'auth/usuario',
    }),
  },

  methods: {
    /**
     * Efetua o logout do usuário.
     *
     * @returns {Promise<void>}
     */
    async doLogout() {
      // Limpa o estado da aplicação e navega para a página 'login'.
      this.$store.commit('auth/setUsuario', null);
      this.$store.commit('auth/setAccessToken', null);
      await this.$router.replace({ name: 'login' });
    },
  },
};
</script>
