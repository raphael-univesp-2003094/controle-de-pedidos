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
import { mapGetters } from 'vuex';
import api from '@/services/api';

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

      try {
        // Envia uma requisição à API para autenticar o usuário.
        const { usuario, accessToken } = await api.auth.login(this.form.email, this.form.senha);

        // Caso a operação seja bem sucedida, salva a resposta da requisição no estado da aplicação
        // e navega para a página 'pedidos'..
        this.$store.commit('auth/setUsuario', usuario);
        this.$store.commit('auth/setAccessToken', accessToken);
        await this.$router.replace({ name: 'pedidos' });
      } catch (e) {
        // Caso a operação não seja bem sucedida, limpa o estado da aplicação.
        this.$store.commit('auth/setUsuario', null);
        this.$store.commit('auth/setAccessToken', null);
      }

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },
  },
};
</script>
