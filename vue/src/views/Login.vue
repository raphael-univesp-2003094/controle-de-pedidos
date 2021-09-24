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

export default {
  name: 'Login',

  data() {
    return {
      isBusy: false,
      form: {
        email: '',
        senha: '',
      },
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
    }),

    async doLogin() {
      this.isBusy = true;

      await this.login(this.form);

      if (this.isAuthenticated) {
        await this.$router.replace({ name: 'pedidos' });
      }

      this.isBusy = false;
    },
  },
};
</script>
