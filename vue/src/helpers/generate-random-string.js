/**
 * Gera uma string aleatoria contendo a quantidade de caracteres informada no parâmetro "length".
 *
 * @param length Tamanho da string que será gerada.
 * @returns {string}
 */
export default function generateRandomString(length) {
  // Define a lista de caracteres permitidos na geração da string.
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Define o valor inicial da variável que será retornada.
  let str = '';

  // Itera pela quantidade de vezes solicitadas (length) inserindo caracteres aleatórios na variavel
  // inicial.
  for (let i = 0; i <= length; i += 1) {
    // Gera um número aleatório sendo no máximo igual ao tamanho da lista de caracteres permitidos.
    const randomNumber = Math.floor(Math.random() * chars.length);

    // Adiciona um caractere da lista de caracteres permitido, que está na posição referente ao
    // número aleatório gerado, à variável inicial.
    str += chars.substring(randomNumber, randomNumber + 1);
  }

  // Retorna o valor gerado.
  return str;
}
