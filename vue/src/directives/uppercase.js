/* eslint-disable no-param-reassign */

/**
 * Diretiva que coloca o valor do input em letra maiúscula.
 *
 * @type {{
 * update(HTMLInputElement): void
 * }}
 */
const uppercase = {
  /**
   * Vincula um event listener que é acionado ao alterar o valor do input, cuja função é colocar o
   * valor do input em letra maiúscula.
   *
   * @param {HTMLInputElement} el
   */
  update(el) {
    el.value = el.value.toUpperCase();
  },
};

export default uppercase;
