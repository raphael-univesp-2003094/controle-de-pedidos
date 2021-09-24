<template>
  <div class="container vh-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col mw-330px">
        <form @submit.prevent="doLogin">
          <p class="w-100 fs-1 text-primary text-center">
            <i class="bi bi-shield-lock-fill"></i>
          </p>

          <p>
            <label class="form-label col-form-label-sm">E-mail</label>
            <input class="form-control form-control-sm" type="email" required v-model="form.email"
                   autofocus :disabled="isBusy">
          </p>

          <p>
            <label class="form-label col-form-label-sm">Senha</label>
            <input class="form-control form-control-sm" type="password" required
                   v-model="form.senha" :disabled="isBusy">
          </p>

          <p class="d-grid gap-2">
            <button class="btn btn-sm btn-primary" type="submit" :disabled="isBusy">
              <i class="bi bi-box-arrow-in-right"></i> Entrar
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

/**
 * Página Login.
 * Página que contém o formulário de login da aplicação.
 */
export default {
  name: 'Login',

  data() {
    return {
      // Indicação de que há um comando em execução.
      isBusy: false,

      // Campos do formulário.
      form: {
        email: '',
        senha: '',
      },
    };
  },

  computed: {
    // Valores computados provenientes do estado da aplicação.
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  methods: {
    // Ações provenientes do estado da aplicação.
    ...mapActions({
      login: 'auth/login',
    }),

    /**
     * Efetua o login do usuário.
     *
     * @returns {Promise<void>}
     */
    async doLogin() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      // Invoca e aguarda a ação de login do estado da aplicação.
      await this.login(this.form);

      // Caso o usuário esteja autenticado, navega para a página 'pedidos'.
      if (this.isAuthenticated) {
        await this.$router.replace({ name: 'pedidos' });
      }

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },
  },
};
</script>
