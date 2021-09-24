import axios from 'axios';

/**
 * Tokens de cancelamento para que, quando os comandos getPedidos e getPedidos forem chamados pela
 * segunda vez enquanto a primeira chamada não tiver sido concluída, a primeira chamada possa ser
 * cancelada.
 */
let getPedidosCancelTokenSource;
let getPedidoCancelTokenSource;

/**
 * Módulo de consulta à API referente ao controle de pedidos.
 *
 * @type {{
 * createPedido: (function(Object): Promise<{pedido: Object}>),
 * updatePedido: (function({tipo:string, numero:(int|string)}): Promise<{pedido: Object}>),
 * deletePedido: (function(string, (int|string)): Promise<{}>),
 * getPedidos: (function((Object|null)): Promise<{pedidos: Object[]}>),
 * getPedido: (function(string, (string|int)): Promise<{pedido: Object}>)
 * }}
 */
const pedidos = {
  /**
   * Faz uma requisição à API e retorna os pedidos cadastrados.
   * Se a função for chamada pela segunda vez e se a primeira chamada ainda estiver em execução, a
   * primeira chamada será abortada.
   *
   * @param {object|null} filtro Filtro de busca. os atributos devem possuir os nomes dos atributos
   * da entidade.
   * @returns {Promise<{pedidos: object[]}>} Resposta da API.
   */
  getPedidos: (filtro = {}) => {
    // Aborta a chamada anterior (se houver).
    if (getPedidosCancelTokenSource) getPedidosCancelTokenSource.cancel();

    // Salva o token da chamada atual, visando futuro cancelamento.
    getPedidosCancelTokenSource = axios.CancelToken.source();

    // Faz a requisição.
    return axios.get('/api/pedidos', {
      params: filtro,
      cancelToken: getPedidosCancelTokenSource.token,
    })
      .then((response) => response.data);
  },

  /**
   * Faz uma requisição à API e retorna um pedido cadastrado referente ao "tipo" e "numero"
   * informado. Se a função for chamada pela segunda vez e se a primeira chamada ainda estiver em
   * execução, a primeira chamada será abortada. Dispara um erro se o pedido não existir.
   *
   * @param {string} tipo Tipo do pedido (SE ou RM).
   * @param {string|int} numero Número do pedido.
   * @returns {Promise<{pedido:object}>} Resposta da API.
   */
  getPedido: (tipo, numero) => {
    // Aborta a chamada anterior (se houver).
    if (getPedidoCancelTokenSource) getPedidoCancelTokenSource.cancel();

    // Salva o token da chamada atual, visando futuro cancelamento.
    getPedidoCancelTokenSource = axios.CancelToken.source();

    // Faz a requisição.
    return axios.get(`/api/pedidos/${tipo}/${numero}`, {
      cancelToken: getPedidoCancelTokenSource.token,
    })
      .then((response) => response.data);
  },

  /**
   * Faz uma requisição à API para criar um novo pedido.
   *
   * @param {object} pedido Dados do pedido que será criado.
   * @returns {Promise<{pedido:object}>} Resposta da API.
   */
  createPedido: (pedido) => axios.post('/api/pedidos', pedido)
    .then((response) => response.data),

  /**
   * Faz uma requisição à API para alterar um pedido.
   *
   * @param {{tipo:string, numero:(int|string)}} pedido Dados do pedido que será alterado.
   * @returns {Promise<{pedido: object}>} Resposta da API.
   */
  updatePedido: (pedido) => axios.post(`/api/pedidos/${pedido.tipo}/${pedido.numero}`, pedido)
    .then((response) => response.data),

  /**
   * Faz uma requisição à API para excluir um pedido.
   *
   * @param {string} tipo Tipo do pedido (RM ou SE).
   * @param {int|string} numero Número do pedido.
   * @returns {Promise<{}>} Resposta da API.
   */
  deletePedido: (tipo, numero) => axios.post(`/api/pedidos/${tipo}/${numero}`)
    .then((response) => response.data),
};

export default pedidos;
