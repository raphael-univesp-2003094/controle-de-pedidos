import axios from 'axios';
import convertObjKeys from '@/helpers/convert-obj-keys';

/**
 * Módulo de consulta à API referente ao controle de usuários.
 *
 * @type {{
 * deleteUsuario: (function((int|string)): Promise<{}>),
 * getUsuarios: (function((Object|null)=): Promise<{usuarios: Object[]}>),
 * getUsuario: (function((int|string)): Promise<{usuario: Object}>),
 * createUsuario: (function(Object): Promise<{usuario: Object}>),
 * updateUsuario: (function(Object): Promise<{usuario: Object}>)
 * }}
 */
const usuarios = {
  /**
   * Faz uma requisição à API e retorna os usuários cadastrados.
   *
   * @param {object|null} filtro Filtro de busca. os atributos devem possuir os nomes dos atributos
   * da entidade.
   * @returns {Promise<{usuarios: object[]}>} Resposta da API.
   */
  getUsuarios: (filtro = {}) => axios.get('/api/usuarios', {
    params: convertObjKeys(filtro, 'snake_case'),
  })
    .then((response) => convertObjKeys(response.data, 'camelCase')),

  /**
   * Faz uma requisição à API e retorna o usuário referente ao "id" informado.
   * Dispara um erro se o usuário não existir.
   *
   * @param {int|string} id Id do usuário.
   * @returns {Promise<{usuario: object}>} Resposta da API.
   */
  getUsuario: (id) => axios.get(`/api/usuarios/${id}`)
    .then((response) => convertObjKeys(response.data, 'camelCase')),

  /**
   * Faz uma requisição à API para criar um novo usuário.
   *
   * @param {object} usuario Dados do usuário que será criado.
   * @returns {Promise<{usuario: object}>} Resposta da API.
   */
  createUsuario: (usuario) => axios.post('/api/usuarios', convertObjKeys(usuario, 'snake_case'))
    .then((response) => convertObjKeys(response.data, 'camelCase')),

  /**
   * Faz uma requisição à API para alterar um usuário.
   *
   * @param {object} usuario Dados do usuário que será alterado.
   * @returns {Promise<{usuario: object}>} Resposta da API.
   */
  updateUsuario: (usuario) => axios.patch(`/api/usuarios/${usuario.id}`, convertObjKeys(usuario, 'snake_case'))
    .then((response) => convertObjKeys(response.data, 'camelCase')),

  /**
   * Faz uma requisição à API para excluir um usuário.
   *
   * @param {int|string} id Id do usuário.
   * @returns {Promise<{}>} Resposta da API.
   */
  deleteUsuario: (id) => axios.delete(`/api/usuarios/${id}`)
    .then((response) => convertObjKeys(response.data, 'camelCase')),
};

export default usuarios;
