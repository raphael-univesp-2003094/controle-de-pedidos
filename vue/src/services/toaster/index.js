import { Toast } from 'bootstrap';

// Container onde serão alocadas as toasts visíveis.
let toastContainerEl = null;

/**
 * Cria um container para alocar as toasts visíveis.
 */
function createToastContainer() {
  // Cria o container de toasts.
  toastContainerEl = document.createElement('div');
  toastContainerEl.className = 'toast-container position-fixed bottom-0 end-0 p-3';
  toastContainerEl.style.zIndex = '11';

  // Insere o container de toasts no body da página.
  document.body.appendChild(toastContainerEl);
}

/**
 * Cria uma toast e retorna seu elemento HTML.
 * @param {'success'|'danger'|'warning'|'primary'} intent Intenção da toast.
 * @param {string} title Título da toast.
 * @param {string} message Mensagem da toast.
 * @param {{intent: 'success'|'danger'|'warning'|'primary', text: string,
 * onClick: function}[]} buttons Botões da toast.
 * @returns {HTMLDivElement} Elemento HTML da toast criada.
 */
function createToast(intent, title, message, buttons = []) {
  // Cria o container de toasts, caso ele não tenha sido criado.
  if (!toastContainerEl) {
    createToastContainer();
  }

  // Cria o cabeçalho da toast.
  const iconEl = document.createElement('i');
  iconEl.className = `bi bi-square-fill text-${intent} me-2`;
  const titleEl = document.createElement('strong');
  titleEl.className = 'me-auto';
  titleEl.textContent = title;
  const closeBtnEl = document.createElement('button');
  closeBtnEl.className = 'btn-close';
  closeBtnEl.setAttribute('type', 'button');
  closeBtnEl.setAttribute('data-bs-dismiss', 'toast');
  const headerEl = document.createElement('div');
  headerEl.className = 'toast-header';
  headerEl.appendChild(iconEl);
  headerEl.appendChild(titleEl);
  headerEl.appendChild(closeBtnEl);

  // Cria os botões da toast (se houver).
  let btnContainerEl = null;
  if (buttons.length > 0) {
    btnContainerEl = document.createElement('div');
    btnContainerEl.className = 'mt-2 pt-2 border-top';
    buttons.forEach((btn) => {
      const btnEl = document.createElement('button');
      btnEl.className = `btn btn-${btn.intent || 'primary'} btn-sm me-2`;
      btnEl.textContent = btn.text;
      btnEl.setAttribute('data-bs-dismiss', 'toast');
      btnEl.style.width = '60px';
      if (typeof btn.onClick === 'function') btnEl.addEventListener('click', btn.onClick);
      btnContainerEl.appendChild(btnEl);
    });
  }

  // Cria o corpo da toast.
  const bodyEl = document.createElement('div');
  bodyEl.className = 'toast-body';
  bodyEl.textContent = message;
  if (btnContainerEl) bodyEl.appendChild(btnContainerEl);

  // Cria o elemento da toast.
  const toastEl = document.createElement('div');
  toastEl.className = 'toast mb-2 mt-2';
  toastEl.setAttribute('role', 'alert');
  toastEl.appendChild(headerEl);
  toastEl.appendChild(bodyEl);

  // Insere a toast no container de toasts.
  toastContainerEl.appendChild(toastEl);

  // Cria um event listener que apaga a toast quando ela for ocultada.
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastContainerEl.removeChild(toastEl);
  });

  return toastEl;
}

/**
 * Serviço de exibição de toasts.
 * @type {{displaySuccess(string): void, displayError(string): void, displayConfirm(string,
 * Function, Function): void, displayWarning(string): void}}
 */
const toaster = {
  /**
   * Mostra uma toast com intenção de sucesso.
   * @param {string} message Mensagem da toast.
   */
  displaySuccess(message) {
    // Cria o elemento HTML da toast.
    const toastEl = createToast('success', 'Sucesso', message);

    // Cria o elemento bootstrap da toast.
    const toast = new Toast(toastEl);

    // Exibe a toast.
    toast.show();
  },

  /**
   * Mostra uma toast com intenção de atenção.
   * @param {string} message Mensagem da toast.
   */
  displayWarning(message) {
    // Cria o elemento HTML da toast.
    const toastEl = createToast('warning', 'Atenção', message);

    // Cria o elemento bootstrap da toast.
    const toast = new Toast(toastEl);

    // Exibe a toast.
    toast.show();
  },

  /**
   * Mostra uma toast com intenção de erro.
   * @param {string} message Mensagem da toast.
   */
  displayError(message) {
    // Cria o elemento HTML da toast.
    const toastEl = createToast('danger', 'Erro', message);

    // Cria o elemento bootstrap da toast.
    const toast = new Toast(toastEl);

    // Exibe a toast.
    toast.show();
  },

  /**
   * Mostra uma toast com a intenção de confirmar uma ação do usuário com botões "Sim" e "Não".
   * @param {string} message Mensagem da toast.
   * @param {function} onYes Função executada quando o usuário pressionar o botão "Sim".
   * @param {function} onNo Função executada quando o usuário pressionar o botão "Não".
   */
  displayConfirm(message, onYes, onNo = null) {
    // Cria o elemento HTML da toast.
    const toastEl = createToast('primary', 'Confirme', message, [
      { intent: 'primary', text: 'Sim', onClick: onYes },
      { intent: 'danger', text: 'Não', onClick: onNo },
    ]);

    // Cria o elemento bootstrap da toast.
    const toast = new Toast(toastEl);

    // Exibe a toast.
    toast.show();
  },
};

export default toaster;
