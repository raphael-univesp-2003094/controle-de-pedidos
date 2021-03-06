<template>
  <div>
    <NavBar/>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3 class="my-4">
            <i class="bi bi-key"></i>
            Alterar Senha
          </h3>
        </div>
      </div>

      <div class="row">
        <div class="col mw-600px">
          <form @submit.prevent="updateSenha">
            <div class="row align-items-end">
              <div class="col">
                <label class="form-label col-form-label-sm">Nova Senha</label>
                <input class="form-control form-control-sm" ref="newSenhaInput" type="password"
                       required v-model="form.newSenha" :disabled="isBusy">
              </div>

              <div class="col">
                <label class="form-label col-form-label-sm">Repita a Nova Senha</label>
                <input class="form-control form-control-sm" type="password" required
                       v-model="form.repeatNewSenha" :disabled="isBusy">
              </div>

              <div class="col">
                <button class="btn btn-sm btn-primary" type="submit" :disabled="isBusy">
                  <i class="bi bi-check2-circle"></i>
                  Alterar Senha
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import NavBar from '@/components/NavBar.vue';
import toaster from '@/services/toaster';
import * as yup from "yup";

/**
 * Página Alterar Senha.
 * Página que contém um formulário para alteração da senha do usuário que está atualmente conectado.
 */
export default {
  name: 'AlterarSenha',

  components: { NavBar },

  data() {
    return {
      // Indicação de que há um comando em execução.
      isBusy: false,

      // Campos do formulário.
      form: {
        newSenha: '',
        repeatNewSenha: '',
      },

      // Esquema de validação do formulário.
      validationSchema: yup.object().shape({
        newSenha: yup.string()
          .required('O campo "Nova Senha" é obrigatório.'),
        repeatNewSenha: yup.string()
          .required('O campo "Repita a Nova Senha" é obrigatório.'),
      }),
    };
  },

  methods: {
    /**
     * Atualiza a senha do usuário.
     *
     * @returns {Promise<void>}
     */
    async updateSenha() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Valida o formulário e caso haja algum erro, mostra uma toast e aborta a operação.
      try {
        await this.validationSchema.validate(this.form, { abortEarly: false });
      } catch (e) {
        toaster.displayError(e.errors.join('\n'));
        return;
      }

      // Cancela o comando e exibe um erro caso as senhas informadas sejam divergentes.
      if (this.form.newSenha !== this.form.repeatNewSenha) {
        toaster.displayError("Os campos 'Nova Senha' e 'Repita a Nova Senha' não conferem.");
        return;
      }

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      try {
        // Busca no estado da aplicação o usuário autenticado.
        const usuario = this.$store.getters['auth/usuario'];

        // Faz uma requisição à API para alterar a senha do usuário.
        await api.usuarios.updateUsuario({
          ...usuario,
          senha: this.form.newSenha,
        });

        // Exibe uma mensagem de sucesso caso a operação seja concluída.
        toaster.displaySuccess('Senha alterada com sucesso. Caso a esqueça, contate o administrador para redefini-la.');

        // Navega para a página "pedidos".
        await this.$router.replace({ name: 'pedidos' });
      } catch (e) {
        // Mostra a mensagem de erro vinda da API (caso exista) ou uma mensagem de erro padrão,
        // caso a operação não seja concluída.
        if (e.response?.data?.error) {
          toaster.displayError(e.response.data.error);
        } else {
          toaster.displayError('Ocorreu um erro ao alterar a senha.');
        }
      }

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },

    mounted() {
      // Muda o foco para o input newSenha.
      this.$refs.newSenhaInput.focus();
    },
  },
};
</script>
