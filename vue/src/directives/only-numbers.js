/* eslint-disable no-param-reassign */

/**
 * Diretiva que permite que o valor do input seja composto apenas por números.
 *
 * @type {{
 * inserted(HTMLInputElement): void
 * }}
 */
const onlyNumbers = {
  /**
   * Vincula um event listener que é acionado ao pressionar uma tecla no input e ao colar algo da
   * área de transferência, impedindo que seja inseridos textos que não ão números no input.
   *
   * @param {HTMLInputElement} el
   */
  inserted(el) {
    el.onkeypress = (event) => {
      if (Number.isNaN(Number.parseInt(event.key, 10))) {
        event.preventDefault();
        return false;
      }

      return true;
    };

    el.onpaste = (event) => {
      const data = event.clipboardData.getData('text');

      for (let i = data.length - 1; i >= 0; i -= 1) {
        const charCode = data.charCodeAt(i);
        if (charCode < 48 || charCode > 57) {
          event.preventDefault();
          return false;
        }
      }

      return true;
    };
  },
};

export default onlyNumbers;
