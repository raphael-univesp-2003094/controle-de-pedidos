import axios from 'axios';

// Módulo do estado da aplicação para autenticação.
const auth = {
  namespaced: true,

  state: {
    isLoading: true,
    usuario: null,
    accessToken: null,
  },

  getters: {
    /**
     * Retorna o estado de carregamento do módulo.
     * @param state
     * @returns {boolean}
     */
    isLoading: (state) => state.isLoading,

    /**
     * Retorna o usuário autenticado no momento.
     * @param state
     * @returns {object|null}
     */
    usuario: (state) => state.usuario,

    /**
     * Retorna o token de acesso.
     * @param state
     * @returns {string|null}
     */
    accessToken: (state) => state.accessToken,

    /**
     * Retorna o estado de autenticação do usuário.
     * @param state
     * @returns {boolean}
     */
    isAuthenticated: (state) => (!!state.usuario && !!state.accessToken),
  },

  mutations: {
    /**
     * Altera o estado de carregamento do módulo.
     * @param state
     * @param {bool} isLoading
     */
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },

    /**
     * Altera o usuário autenticado no momento.
     * @param state
     * @param {object|null} usuario
     */
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },

    /**
     * Altera o token de acesso e o armazena no armazenamento local.
     * @param state
     * @param {string|null} accessToken
     */
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    },
  },

  actions: {
    /**
     * Inicializa o módulo.
     * @param commit
     * @param dispatch
     * @returns {Promise<void>}
     */
    async init({ commit, dispatch }) {
      // Busca o token de acesso no armazenamento local.
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        // Caso o token esteja definido, o salva no estado da aplicação carrega o usuário.
        commit('setAccessToken', accessToken);
        await dispatch('loadUsuario');
      } else {
        // Caso o token não esteja definido, efetua o logout.
        await dispatch('logout');
      }

      // Define o estado de carregamento do módulo como concluído.
      commit('setIsLoading', false);
    },

    /**
     * Efetua o login do usuário.
     * @param commit
     * @param dispatch
     * @param {string} email
     * @param {string} senha
     * @returns {Promise<void>}
     */
    async login({ commit, dispatch }, { email, senha }) {
      try {
        // Envia uma requisição à API para autenticar o usuário.
        const { data } = await axios.post('/api/auth/login', { email, senha });

        // Caso a operação seja bem sucedida, salva a resposta da requisição no estado da aplicação.
        commit('setUsuario', data.usuario);
        commit('setAccessToken', data.access_token);
      } catch (e) {
        // Caso a operação não seja bem sucedida, efetua o logout.
        dispatch('logout');
      }
    },

    /**
     * Carrega o usuário atualmente autenticado.
     * @param commit
     * @param dispatch
     * @returns {Promise<void>}
     */
    async loadUsuario({ commit, dispatch }) {
      try {
        // Envia uma requisição à API para carregar o usuário atualmente autenticado.
        const { data } = await axios.post('/api/auth/me');

        // Caso a operação seja bem sucedida, salva o usuário no estado da aplicação.
        commit('setUsuario', data.usuario);
      } catch (e) {
        // Caso a operação não seja bem sucedida, efetua o logout.
        dispatch('logout');
      }
    },

    /**
     * Efetua o logout do usuário.
     * @param commit
     */
    logout({ commit }) {
      // Limpa o estado da aplicação.
      commit('setUsuario', null);
      commit('setAccessToken', null);
    },
  },
};

export default auth;
