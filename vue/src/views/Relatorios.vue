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
              <div class="col col-3">
                <label class="form-label col-form-label-sm">Data de Envio ao Financeiro</label>
                <input class="form-control form-control-sm" ref="dataEnvioFinanceiroInput"
                       type="date" v-model="form.dataEnvioFinanceiro" @change="clearPedidos"
                       :disabled="isBusy">
              </div>

              <div class="col col-9">
                <button class="btn btn-sm btn-primary me-2" type="submit" :disabled="isBusy">
                  <i class="bi bi-search"></i>
                  Buscar
                </button>

                <button class="btn btn-sm btn-secondary me-2" type="button" @click="clearForm"
                        :disabled="isBusy">
                  <i class="bi bi-eraser"></i>
                  Limpar
                </button>

                <button class="btn btn-sm btn-danger" type="button" @click="exportToPDF"
                        :disabled="isBusy || !didSearch">
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
import pdf from '@/services/pdf';

/**
 * Página Relatórios.
 * Página que contém um formulário para busca de pedidos por "Data de Envio ao Financeiro". Também é
 * possível gerar um relatório em PDF da busca que foi efetuada, com os resultados obtidos.
 */
export default {
  name: 'Relatorios',

  components: { NavBar },

  data() {
    return {
      // Indicação de que há um comando em execução.
      isBusy: false,

      // Indicação de que foi efetuada uma busca.
      didSearch: false,

      // Lista de pedidos encontrados na busca.
      pedidos: [],

      // Campos do formulário.
      form: {
        dataEnvioFinanceiro: '',
      },
    };
  },

  methods: {
    /**
     * Exporta os resultados da busca atual para um arquivo de formato PDF.
     */
    exportToPDF() {
      // Cancela o comando caso outro comando esteja em execução, ou caso não tenha sido efetuada
      // uma busca.
      if (this.isBusy || !this.didSearch) return;

      // Exporta os resultados da busca atual para um arquivo de formato PDF.
      pdf.relatorioPedidos.download(this.pedidos, this.form.dataEnvioFinanceiro);
    },

    /**
     * Realiza a busca dos pedidos com base na data de envio ao financeiro e exibe na tabela da
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
        // Faz uma requisição à API para alterar a busca dos pedidos existentes com base na data de
        // envio ao financeiro.
        const { pedidos } = await api.pedidos.getPedidos(this.form);

        // Preenche os pedidos no estado da página.
        this.pedidos = _.values(pedidos);

        // Define o status de que estão sendo exibidos resultados de uma busca.
        this.didSearch = true;

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

      // Define o status de que não estão sendo exibidos resultados de uma busca.
      this.didSearch = false;
    },

    /**
     * Limpa o formulário de busca
     */
    clearForm() {
      // Cancela o comando caso outro comando esteja em execução.
      if (this.isBusy) return;

      // Define o status de que um comando está em execução.
      this.isBusy = true;

      // Limpa o formulário.
      this.form.dataEnvioFinanceiro = '';

      // Limpa a tabela de pedidos carregados.
      this.clearPedidos();

      // Define o status de que não há um comando está em execução.
      this.isBusy = false;
    },

    mounted() {
      // Muda o foco para o input dataEnvioFinanceiro.
      this.$refs.dataEnvioFinanceiroInput.focus();
    },
  },
};
</script>
