import api from '@/services/api';

// Módulo do estado da aplicação para autenticação.
const auth = {
  namespaced: true,

  state: {
    isInitialized: false,
    usuario: null,
    accessToken: null,
  },

  getters: {
    /**
     * Retorna o estado de inicialização do módulo.
     *
     * @param state
     * @returns {boolean}
     */
    isInitialized: (state) => state.isInitialized,

    /**
     * Retorna o usuário autenticado no momento.
     *
     * @param state
     * @returns {object|null}
     */
    usuario: (state) => state.usuario,

    /**
     * Retorna o token de acesso.
     *
     * @param state
     * @returns {string|null}
     */
    accessToken: (state) => state.accessToken,

    /**
     * Retorna o estado de autenticação do usuário.
     *
     * @param state
     * @returns {boolean}
     */
    isAuthenticated: (state) => (!!state.usuario && !!state.accessToken),

    /**
     * Retorna a informação de se o usuário é um administrador.
     *
     * @param state
     * @returns {boolean}
     */
    isAdmin: (state) => (!!state.usuario && state.usuario.admin),
  },

  mutations: {
    /**
     * Altera o estado de inicialização do módulo.
     *
     * @param state
     * @param {bool} isInitialized
     */
    setIsInitialized(state, isInitialized) {
      state.isInitialized = isInitialized;
    },

    /**
     * Altera o usuário autenticado no momento.
     *
     * @param state
     * @param {object|null} usuario
     */
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },

    /**
     * Altera o token de acesso e o armazena no armazenamento local.
     *
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
     *
     * @param commit
     * @returns {Promise<void>}
     */
    async initialize({ commit }) {
      // Busca o token de acesso no armazenamento local.
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        // Caso o token esteja definido, o salva no estado da aplicação carrega o usuário.
        commit('setAccessToken', accessToken);

        try {
          // Envia uma requisição à API para carregar o usuário atualmente autenticado.
          const { usuario } = await api.auth.me();

          // Caso a operação seja bem sucedida, salva o usuário no estado da aplicação.
          commit('setUsuario', usuario);
        } catch (e) {
          // Caso a operação não seja bem sucedida, limpa o estado da aplicação.
          commit('setUsuario', null);
          commit('setAccessToken', null);
        }
      } else {
        // Caso o token não esteja definido, limpa o estado da aplicação.
        commit('setUsuario', null);
        commit('setAccessToken', null);
      }

      // Define o estado de inicialização do módulo como concluído.
      commit('setIsInitialized', true);
    },
  },
};

export default auth;
