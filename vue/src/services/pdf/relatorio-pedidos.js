import { jsPDF as JsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import _ from 'lodash';

// Aplica o plugin de construção de tabelas ao gerador de PDFs.
applyPlugin(JsPDF);

/**
 * Módulo de geração de relatórios PDF com base em listas de pedidos.
 *
 * @type {{
 * download({tipo: string, numero: number, secretariaSolicitante: string, projeto: string,
 * descricao: string}[], string): void
 * }}
 */
const relatorioPedidos = {
  /**
   * Gera um arquivo de relatório PDF constando os pedidos encontrados.
   *
   * @param {{tipo: string, numero: number, secretariaSolicitante: string, projeto: string,
   * descricao: string}[]} pedidos
   * @param {string} date
   */
  download(pedidos, date) {
    // Cria o documento PDF na memória.
    const doc = new JsPDF();

    // Adiciona o título do documento.
    doc.setFontSize(20);
    doc.text('Relatório de Pedidos', 15, 25);

    // Adiciona os parâmetros de busca no documento.
    doc.setFontSize(10);
    const parsedDate = date ? _.reverse(date.split('-')).join('/') : 'Não enviado.';
    doc.text(`Data de Envio ao Financeiro: ${parsedDate}`, 15, 35);

    if (pedidos.length > 0) {
      // Adiciona a tabela de pedidos ao documento, caso haja algum pedido na lista.
      doc.autoTable({
        // Define os valores da tabela e inclui o atributo 'identifier' em cada pedido.
        body: pedidos.map((pedido) => ({
          ...pedido,
          identifier: `${pedido.tipo} ${pedido.numero}`,
        })),

        // Define os cabeçalhos da tabela, e qual a chave que sera utilizada para buscar os valores
        // de cada coluna.
        columns: [
          { header: '#', dataKey: 'identifier' },
          { header: 'Secretaria', dataKey: 'secretariaSolicitante' },
          { header: 'Projeto', dataKey: 'projeto' },
          { header: 'Descrição', dataKey: 'descricao' },
        ],

        // Define o tema da tabela.
        theme: 'grid',

        // Define os estilos das colunas.
        columnStyles: {
          identifier: { cellWidth: 20, halign: 'center', valign: 'middle' },
          secretariaSolicitante: { cellWidth: 25, valign: 'middle' },
          projeto: { cellWidth: 25, valign: 'middle' },
          descricao: { valign: 'middle' },
        },

        // Define os estilos dos cabeçalhos.
        headStyles: {
          halign: 'center', valign: 'middle', textColor: 0, fillColor: 230,
        },

        // Define as margens da tabela.
        startY: 45,
        margin: { bottom: 20 },
      });
    } else {
    //  Adiciona a informação de que nenhum pedido foi encontrado, caso não haja pedidos na lista.
      doc.setFontSize(10);
      doc.text('Nenhum pedido encontrado...', 15, 45);
    }

    // Adiciona ao rodapé de cada página, o número da página atual e o total de páginas.
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i += 1) {
      const str = `Página ${i} de ${totalPages}`;
      doc.setPage(i).setFontSize(10);
      doc.setPage(i).text(str, 15, doc.internal.pageSize.height - 10);
    }

    // Abre um Dialog para que o usuário escolha onde salvar o arquivo gerado.
    doc.save('Relatório de Pedidos.pdf');
  },
};

export default relatorioPedidos;
