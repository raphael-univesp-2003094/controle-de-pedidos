<template>
  <div>
    <NavBar/>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3 class="my-4">
            <i class="bi bi-people"></i>
            Usuários
          </h3>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col mw-600px">
          <form @submit.prevent="createUsuario">
            <div class="row align-items-end">
              <div class="col">
                <label class="form-label col-form-label-sm">Nome</label>
                <input class="form-control form-control-sm" ref="nomeInput" type="text"
                       v-model="form.nome" :disabled="isBusy">
              </div>

              <div class="col">
                <label class="form-label col-form-label-sm">E-mail</label>
                <input class="form-control form-control-sm" type="text" v-model="form.email"
                       :disabled="isBusy">
              </div>

              <div class="col">
                <button class="btn btn-sm btn-primary" type="submit" :disabled="isBusy">
                  <i class="bi bi-person-plus"></i>
                  Criar Usuário
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <table class="table table-sm table-striped table-hover">
            <thead>
            <tr>
              <th class="w-40">Nome</th>
              <th class="w-30">E-mail</th>
              <th class="w-30"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td>{{ usuario.nome }}</td>
              <td>{{ usuario.email }}</td>
              <td v-if="usuario.admin">&nbsp;</td>
              <td class="text-end" v-else>
                <button class="btn btn-sm btn-danger me-2" @click="deleteUsuario(usuario)"
                        :disabled="isBusy">
                  <i class="bi bi-person-dash"></i>
                  Excluir
                </button>
                <button class="btn btn-sm btn-primary" @click="redefineSenha(usuario)"
                        :disabled="isBusy">
                  <i class="bi bi-key"></i>
                  Redefinir Senha
                </button>
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">
                <button class="btn btn-sm btn-secondary" @click="loadUsuarios" :disabled="isBusy">
                  <i class="bi bi-arrow-repeat"></i>
                  Atualizar
                </button>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import * as yup from 'yup';
import api from '@/services/api';
import NavBar from '@/components/NavBar.vue';
import toaster from '@/services/toaster';
import generateRandomString from '@/helpers/generate-random-string';

/**
 * Página Usuários.
 * Página que contém um formulário para cadastro de novos usuários.
 * A página possui uma tabela com os usuários existentes no sistema, possibilitando a exclusão e
 * redefinição de senha.
 * Esta página só pode ser acessada pelo administrador do sistema.
 */
export default {
  name: 'Usuarios',

  components: { NavBar },

  data() {
    return {
      // Indicação de que há um comando em execução.
      isBusy: false,

      // Lista de usuários carregados.
      usuarios: [],

      // Campos do formulário.
      form: {
        nome: '',
        email: '',
      },

      // Esquema de validação do formulário.
      validationSchema: yup.object().shape({
        nome: yup.string()
          .required('O campo "Nome" é obrigatório.'),
        email: yup.string()
          .email('O campo "E-mail" deve conter um e-mail válido.')
          .required('O campo "E-mail" é obrigatório.'),
      }),
    };
  },

  methods: {
    /**
     * Cria um novo usuário.
     *
     * @returns {Promise<void>}
     */
    async createUsuario() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Valida o formulário e caso haja algum erro, mostra uma toast e aborta a operação.
      try {
        await this.validationSchema.validate(this.form, { abortEarly: false });
      } catch (e) {
        toaster.displayError(e.errors.join('\n'));
        return;
      }

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      try {
        // Gera uma senha aleatória com 12 caracteres.
        const senha = generateRandomString(12);

        // Faz uma requisição à API para criar um novo usuário.
        await api.usuarios.createUsuario({
          ...this.form,
          senha,
        });

        // Limpa os campos do formulário de cadastro.
        this.form.nome = '';
        this.form.email = '';

        // Define o status de que não há um comando está em execução.
        this.isBusy = false;

        // Exibe uma mensagem de sucesso caso a operação seja concluída.
        toaster.displaySuccess(`Usuário de e-mail ${this.email} criado com sucesso. A senha do novo usuário é "${senha}".`);

        // Muda o foco para o input nome.
        this.$refs.nomeInput.focus();

        // Recarrega os usuários cadastrados.
        await this.loadUsuarios();
      } catch (e) {
        // Mostra a mensagem de erro vinda da API (caso exista) ou uma mensagem de erro padrão,
        // caso a operação não seja concluída.
        if (e.response?.data?.error) {
          toaster.displayError(e.response.data.error);
        } else {
          toaster.displayError('Ocorreu um erro ao criar o usuário.');
        }

        // Define o status de que não há um comando está em execução.
        this.isBusy = false;
      }
    },

    /**
     * Carrega os usuários cadastrados.
     *
     * @returns {Promise<void>}
     */
    async loadUsuarios() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      try {
        // Faz uma requisição à API para buscar os usuários cadastrados.
        const { usuarios } = await api.usuarios.getUsuarios();

        // Substitui os usuários no estado da página.
        this.usuarios = _.values(usuarios);
      } catch (e) {
        // Mostra a mensagem de erro vinda da API (caso exista) ou uma mensagem de erro padrão,
        // caso a operação não seja concluída.
        if (e.response?.data?.error) {
          toaster.displayError(e.response.data.error);
        } else {
          toaster.displayError('Ocorreu um erro ao carregar os usuários.');
        }
      }

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },

    /**
     * Exclui o usuário cujo id foi passado dentro do parâmetro "usuario".
     *
     * @param usuario Usuário que será excluído.
     * @returns {void}
     */
    deleteUsuario(usuario) {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Questiona o usuário confirmando a exclusão.
      toaster.displayConfirm(
        `Deseja realmente excluir o usuário de e-mail ${usuario.email}?`,
        // Operação que será executada caso o usuário pressione "Sim".
        async () => {
          // Define o status de que um comando está em execução.
          this.isBusy = true;

          try {
            // Faz uma requisição à API para excluir o usuário informado.
            await api.usuarios.deleteUsuario(usuario.id);

            // Exibe uma mensagem de sucesso caso a operação seja concluída.
            toaster.displaySuccess('Usuário excluído com sucesso.');
          } catch (e) {
            // Mostra a mensagem de erro vinda da API (caso exista) ou uma mensagem de erro padrão,
            // caso a operação não seja concluída.
            if (e.response?.data?.error) {
              toaster.displayError(e.response.data.error);
            } else {
              toaster.displayError('Ocorreu um erro ao excluir o usuário.');
            }
          }

          // Define o status de que não há um comando está em execução.
          this.isBusy = false;

          // Recarrega os usuários cadastrados.
          await this.loadUsuarios();
        },
      );
    },

    /**
     * Altera a senha aleatoriamente do usuário cujo id foi passado dentro do parâmetro "usuário".
     *
     * @param usuario Usuário que terá a senha redefinida.
     * @returns {void}
     */
    redefineSenha(usuario) {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Questiona o usuário confirmando a alteração da senha.
      toaster.displayConfirm(`Deseja realmente redefinir a senha do usuário de e-mail ${usuario.email}?`,
        // Operação que será executada caso o usuário pressione "Sim".
        async () => {
          // Define o status de que um comando está em execução.
          this.isBusy = true;

          try {
            // Gera uma senha aleatória com 12 caracteres.
            const senha = generateRandomString(12);

            // Faz uma requisição à API para alterar a senha do usuário informado.
            await api.usuarios.updateUsuario({
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email,
              senha,
            });

            // Exibe uma mensagem de sucesso caso a operação seja concluída.
            toaster.displaySuccess(`Senha redefinida com sucesso. A nova senha do usuário de e-mail ${usuario.email} é "${senha}".`);
          } catch (e) {
            // Mostra a mensagem de erro vinda da API (caso exista) ou uma mensagem de erro padrão,
            // caso a operação não seja concluída.
            if (e.response?.data?.error) {
              toaster.displayError(e.response.data.error);
            } else {
              toaster.displayError('Ocorreu um erro ao redefinir a senha do usuário.');
            }
          }

          // Define o status de que não há um comando está em execução.
          this.isBusy = false;
        });
    },
  },

  mounted() {
    // Muda o foco para o input newSenha.
    this.$refs.nomeInput.focus();

    // Carrega os usuários cadastrados.
    this.loadUsuarios();
  },
};
</script>
