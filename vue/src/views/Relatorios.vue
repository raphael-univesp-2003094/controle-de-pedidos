<template>
  <div>
    <NavBar/>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3 class="my-4">
            <i class="bi bi-clipboard-data"></i>
            Relatórios
          </h3>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <form @submit.prevent="searchPedidos">
            <div class="row align-items-end">
              <div class="col col-4">
                <label class="form-label col-form-label-sm">Buscar Pedidos por...</label>
                <select class="form-select form-select-sm" v-model="form.searchField"
                        @change="clearPedidos" :disabled="isBusy">
                  <option value="dataChegada">Data de Chegada</option>
                  <option value="dataEnvioFinanceiro">Data de Envio ao Financeiro</option>
                </select>
              </div>

              <div class="col col-3">
                <label class="form-label col-form-label-sm">&nbsp;</label>
                <input class="form-control form-control-sm" ref="searchValueInput" type="date"
                       v-model="form.searchValue" @change="clearPedidos" :disabled="isBusy">
              </div>

              <div class="col col-5">
                <button class="btn btn-sm btn-primary me-2" type="submit"
                        :disabled="!form.searchValue || !form.searchField || isBusy">
                  <i class="bi bi-search"></i>
                  Buscar
                </button>

                <button class="btn btn-sm btn-secondary me-2" type="button" @click="clearForm"
                        :disabled="isBusy">
                  <i class="bi bi-eraser"></i>
                  Limpar
                </button>

                <button class="btn btn-sm btn-secondary" type="button" @click="exportToPDF"
                        :disabled="pedidos.length === 0 || isBusy">
                  <i class="bi bi-file-earmark-pdf"></i>
                  Exportar para PDF
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <table class="table table-sm table-striped table-hover" v-if="pedidos.length > 0">
            <thead>
            <tr>
              <th class="w-15">#</th>
              <th class="w-25">Secretaria</th>
              <th class="w-20">Projeto</th>
              <th class="w-40">Descrição</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.id">
              <td>{{ `${pedido.tipo} ${pedido.numero}` }}</td>
              <td>{{ pedido.secretariaSolicitante }}</td>
              <td>{{ pedido.projeto }}</td>
              <td>{{ pedido.descricao }}</td>
            </tr>
            </tbody>
          </table>
          <p class="fs-6" v-else>Nenhum pedido...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import api from '@/services/api';
import NavBar from '@/components/NavBar.vue';
import toaster from '@/services/toaster';

/**
 * Página Relatórios.
 * Página que contém um formulário para busca de pedidos por "Data de Envio ao Financeiro" e "Data
 * de Chegada". Também é possível gerar um relatório em PDF da busca que foi efetuada, com os
 * resultados obtidos.
 */
export default {
  name: 'Relatorios',

  components: { NavBar },

  data() {
    return {
      // Indicação de que há um comando em execução.
      isBusy: false,

      // Lista de pedidos encontrados na busca.
      pedidos: [],

      // Campos do formulário.
      form: {
        searchField: 'dataEnvioFinanceiro',
        searchValue: '',
      },
    };
  },

  methods: {
    exportToPDF() {
      // TODO: criar exportação para PDF.
    },

    /**
     * Realiza a busca dos pedidos com base nos campos do formulário de busca e exibe na tabela da
     * página.
     *
     * @returns {Promise<void>}
     */
    async searchPedidos() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      try {
        // Faz uma requisição à API para alterar a busca dos pedidos existentes com base nos campos
        // do formulário de busca.
        const { pedidos } = await api.pedidos.getPedidos({
          [this.form.searchField]: this.form.searchValue,
        });

        // Preenche os pedidos no estado da página.
        this.pedidos = _.values(pedidos);

        // Exibe uma mensagem de sucesso caso a operação seja concluída.
        toaster.displaySuccess('Pedidos carregados com sucesso.');
      } catch (e) {
        // Exibe uma mensagem de erro caso a operação não seja concluída.
        toaster.displayError('Ocorreu um erro ao buscar os pedidos.');
      }

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },

    /**
     * Limpa a tabela de pedidos carregados.
     */
    clearPedidos() {
      // Limpa os pedidos do estado da página.
      this.pedidos = [];
    },

    /**
     * Limpa o formulário de busca
     */
    clearForm() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      // Limpa os pedidos do estado da página.
      this.pedidos = [];

      // Limpa o formulário.
      this.searchField = 'dataEnvioFinanceiro';
      this.searchValue = '';

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },

    mounted() {
      // Muda o foco para o input searchValue.
      this.$refs.searchValueInput.focus();
    },
  },
};
</script>
