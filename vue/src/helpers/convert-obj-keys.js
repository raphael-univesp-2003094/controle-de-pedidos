import _ from 'lodash';

/**
 * Converte as chaves de um objeto para snake_case ou camelCase.
 *
 * @param {object} obj
 * @param {'snake_case'|'camelCase'} format
 * @returns {object}
 */
export default function convertObjKeys(obj, format = 'snake_case') {
  // Caso o valor do parâmetro 'obj' não for um objeto, retorna seu valor.
  if (typeof (obj) !== 'object') return obj;

  // Cria um novo objeto, que receberá as novas chaves e valores.
  const newObj = {};

  // Cria a variável que conterá o conversor das chaves.
  let converter;

  // Define o conversor das chaves dependendo do formato solicitado.
  if (format === 'snake_case') {
    converter = _.snakeCase;
  } else if (format === 'camelCase') {
    converter = _.camelCase;
  }

  // Itera as chaves do objeto antigo.
  Object.keys(obj).forEach((key) => {
    // Gera o valor da nova chave.
    const newKey = converter(key);

    // Caso o valor da respectiva chave seja um objeto, aplica a recursividade. Caso não seja,
    // simplesmente atribui o valor.
    if (obj[key] !== null && typeof (obj[key]) === 'object') {
      newObj[newKey] = convertObjKeys(obj[key], format);
    } else {
      newObj[newKey] = obj[key];
    }
  });

  // Retorna o novo objeto.
  return newObj;
}
