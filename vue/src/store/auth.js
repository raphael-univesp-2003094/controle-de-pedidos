import axios from 'axios';

// Define o local de armazenamento onde serão salvos os tokens de autenticação e refresh.
const tokenStorage = localStorage;

// Módulo do estado da aplicação para autenticação.
const auth = {
  namespaced: true,

  state: {
    isLoading: true,
    usuario: null,
    accessToken: null,
    refreshToken: null,
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
     * Retorna o token de refresh.
     * @param state
     * @returns {string|null}
     */
    refreshToken: (state) => state.refreshToken,

    /**
     * Retorna o estado de autenticação do usuário.
     * @param state
     * @returns {boolean}
     */
    isAuthenticated: (state) => state.usuario && state.accessToken && state.refreshToken,
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
     * Altera o token de acesso e o armazena no local de armazenamento definido.
     * @param state
     * @param {string|null} accessToken
     */
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;

      if (accessToken) {
        tokenStorage.setItem('accessToken', accessToken);
      } else {
        tokenStorage.removeItem('accessToken');
      }
    },

    /**
     * Altera o token de refresh e o armazena no local de armazenamento definido.
     * @param state
     * @param refreshToken
     */
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;

      if (refreshToken) {
        tokenStorage.setItem('refreshToken', refreshToken);
      } else {
        tokenStorage.removeItem('refreshToken');
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
      // Busca os tokens de acesso e refresh no local de armazenamento.
      const accessToken = tokenStorage.getItem('accessToken');
      const refreshToken = tokenStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        // Caso ambos os tokens esteja definidos, carrega o usuário.
        await dispatch('loadUsuario');
      } else {
        // Caso algum token não esteja definido, efetua o logout.
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
        commit('setRefreshToken', data.refresh_token);
      } catch (e) {
        // Caso a operação não seja bem sucedida, efetua o logout.
        dispatch('logout');
      }
    },

    /**
     * Efetua o refresh do token de acesso.
     * @param commit
     * @param dispatch
     * @param getters
     * @returns {Promise<void>}
     */
    async refresh({ commit, dispatch, getters }) {
      try {
        // Envia uma requisição à API para atualizar o token de acesso.
        const { data } = await axios.post('/api/auth/refresh', {}, {
          Authorization: `Bearer ${getters.refreshToken}`,
        });

        // Caso a operação seja bem sucedida, salva o novo token no estado da aplicação.
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
      commit('setRefreshToken', null);
    },
  },
};

export default auth;
