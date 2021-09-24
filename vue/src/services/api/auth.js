import axios from 'axios';

/**
 * Módulo de consulta à API referente ao controle de autenticação.
 *
 * @type {{
 * me: (function(): Promise<{usuario: Object}>),
 * login: (function(string, string): Promise<{usuario: Object, access_token: string}>)
 * }}
 */
const auth = {
  /**
   * Faz uma requisição à API e retorna o usuário autenticado no momento.
   *
   * @returns {Promise<{usuario: object}>} Resposta da API.
   */
  me: () => axios.post('/api/auth/me')
    .then((response) => response.data),

  /**
   * Faz uma requisição à API para efetuar o login do usuário.
   *
   * @param {string} email E-mail do usuário.
   * @param {string} senha Senha do usuário.
   * @returns {Promise<{usuario: object, access_token: string}>} Resposta da API.
   */
  login: (email, senha) => axios.post('/api/auth/login', { email, senha })
    .then((response) => response.data),
};

export default auth;
