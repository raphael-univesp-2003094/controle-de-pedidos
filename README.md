# Controle de Pedidos

##### Projeto Integrador I (Eixo de Computação) / UNIVESP / Grupo 002

## Sobre a Aplicação

Aplicação desenvolvida para uso do Serviço de Compras da Prefeitura Municipal de Penápolis, visando melhorar a gestão de
pedidos de compra e controle interno. A aplicação foi desenvolvida para atendimento ao Projeto Integrado I do Eixo de
Computação da UNIVESP do Grupo 002.

## Sobre o Desenvolvimento

Para o desenvolvimento do Frontend da aplicação foi utilizado o conceito de SPA (Single Page Application) através do
Framework VueJs 2, visto que este conceito torna a experiência do usuário mais agradável por evitar carregamentos de
página. Este conceito também torna a aplicação mais rápida, pois o website é totalmente carregado pelo navegador ao
abrir a página, reduzindo o número de requisições ao Backend.

Em relação à estilização da aplicação, foi utilizada a biblioteca de estilos Bootstrap 5 (versão estável mais recente no
momento), pois ela traz uma enorme gama de componentes CSS (Cascading Style Sheets) já configurados e padronizados,
deixando a aplicação com uma aparência uniforme, melhorando e experiência do usuário.

Para o desenvolvimento do Backend da aplicação (API) foi utilizado o Framework Flask por ser um framework leve e limpo,
e também devido à sua facilidade de configuração e implantação. Foi cogitado o uso do Django como Backend, porém devido
a ele ser mais robusto, muitas das suas ferramentas built-in (ferramentas padrões do Framework) não seriam utilizadas no
projeto, tornando a aplicação desnecessariamente mais pesada, ou poluída. Também foi cogitada a utilização da linguagem
PHP como Backend, através do Framework Laravel ou Lumen, entretanto devido à linguagem Python ter se mostrado mais limpa
e versátil durante as aulas, foi descartada esta ideia.

A autenticação de usuários da aplicação utiliza JWTs (JSON Web Tokens), que consiste num método RCT 7519 padrão da
indústria para realizar autenticação entre duas partes através de um token assinado que autentica uma requisição ‘web’.
Esse token é um código em Base64 que armazena um objeto JSON com os dados que permitem a autenticação da requisição.

Durante o desenvolvimento da aplicação e testes foi utilizado o banco de dados Sqlite3 devido à sua versatilidade, dado
que ele é simplesmente um arquivo, independente de instalação de qualquer outro ‘software’ para ser lido ou executado.

A aplicação está hospedada no servidor do Heroku, visto que ele é gratuito (salvo se a aplicação for de grande escala e
necessitar de mais recursos, pois alguns recursos são pagos), e está disponível em:
https://controle-de-pedidos-pmp.herokuapp.com.

No ambiente de produção está em uso o banco de dados PostgreSQL, pois o mesmo é disponibilizado de forma gratuita pelo
Heroku (com algumas limitações: 20 conexões simultâneas e 10.000 registros), e atende perfeitamente ao escopo do
projeto.

Para controle de versão foi utilizada a ferramenta Git, por ela ser totalmente gratuita e atender às necessidades do
escopo do projeto. Também, para compartilhamento dos arquivos foi utilizado um repositório no GitHub, por ele ser
totalmente compatível com o Git, ser gratuito e atender às necessidades para o desenvolvimento do projeto em grupo.

## Frameworks, Bibliotecas e Pacotes Utilizados

### Backend

- <b>Flask: </b> Framework desenvolvido em linguagem Python utilizado para desenvolvimento do backend.
- <b>Flask-Migrate: </b> Biblioteca utilizada para criação de migrations para criação do banco de dados.
- <b>Flask-SQLAlchemy: </b> Biblioteca utilizada para comunicação com o banco de dados.
- <b>Flask-JWT-Extended: </b> Biblioteca utilizada para manipulação e autenticação do backend, utilizando tokens de
  acesso JWT (JSON Web Token).
- <b>Python-DotEnv: </b> Biblioteca utilizada para carregamento de variáveis de ambiente de arquivos '.env', utilizados
  para configuração da aplicação.
- <b>Werkzeug: </b> Biblioteca utilizada para criptografia de senhas.
- <b>Click: </b> Biblioteca utilizada para auxílio na criação de comandos CLI.
- <b>Gunicorn: </b> Biblioteca utilizada para executar a aplicação em ambientes UNIX. Neste projeto, utiliza-se ela para
  a execução da aplicação no ambiente de hospedagem do Heroku.
- <b>Psycopg2: </b> Biblioteca utilizada pelo Flask-SQLAlchemy para comunicação com bancos de dados PostgreSQL.

### Frontend

- <b>Vue: </b> Framework desenvolvido em linguagem JavaScript utilizado para desenvolver a SPA (Single Page Application)
  do frontend.
- <b>Vue-Router: </b> Pacote utilizado para manipulação e gestão de rotas.
- <b>Vuex: </b> Pacote utilizado para manipulação e gestão do estado da aplicação. Neste projeto, foi utilizado apenas
  para a gestão da autenticação da aplicação.
- <b>Axios: </b> Pacote utilizado para manipulação de requisições AJAX para comunicação com o backend.
- <b>Lodash: </b> Pacote de helpers (funções de ajuda), tais como conversão de strings do formato snake_case para
  camelCase e vice-versa.
- <b>Yup: </b> Pacote utilizado para validação de formulários.
- <b>ESLint: </b> Pacote utilizado para padronização do código e evidenciação de alguns bugs. Neste projeto, foi
  utilizado o padrão Airbnb.
- <b>Bootstrap: </b> Framework CSS utilizado para estilização dos componentes da aplicação.
- <b>PopperJs: </b> Pacote utilizado pelo framework Bootstrap para exibição de toasts.
- <b>JsPDF: </b> Pacote utilizado para criação de arquivos PDFs.
- <b>JsPDF-AutoTable: </b> Pacote de plugin do JsPDF utilizado para criação de tabelas em arquivos PDFs.
- <b>Sass e Sass-Loader: </b> Pacotes de compiladores utilizado para a compilação dos estilos da aplicação escritos em
  SCSS (Syntactically Awesome Style Sheets).

## Rotas / Endpoints

### Backend (API)

- <b>[POST] /api/auth/login</b> - Executa o login do usuário e retorna o token de acesso. Deverão ser obrigatoriamente 
informados os atributos "email" e "senha".
- <b>[POST] /api/auth/me*</b> - Busca e retorna o usuário atualmente autenticado.


- <b>[GET] /api/pedidos*</b> - Busca e retorna todos os pedidos cadastrados. Poderão ser informados os parâmetros da 
busca, sendo possível buscar por qualquer atributo da entidade Pedido.
- <b>[GET] /api/pedidos/\<string:tipo>\<int:numero>*</b> - Busca e retorna o pedido cujo "tipo" e "numero" corresponde 
ao informado na URI.
- <b>[POST] /api/pedidos*</b> - Cadastra um novo pedido. Deverão ser obrigatoriamente informados os atributos da 
entidade Pedido cujo preenchimento seja obrigatório e poderão ser informados os demais atributos. 
- <b>[PATCH | PUT] /api/pedidos/\<string:tipo>\<int:numero>*</b> - Atualiza os atributos de um pedido já cadastrado cujo
"tipo" e "numero" corresponde ao informado na URI. Deverão ser obrigatoriamente informados os atributos da entidade 
Pedido cujo preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[DELETE] /api/pedidos/\<string:tipo>\<int:numero>*</b> - Exclui um pedido existente cujo "tipo" e "numero" 
corresponde ao informado na URI.


- <b>[GET] /api/usuarios**</b> - Busca e retorna todos os usuários cadastrados. Poderão ser informados os parâmetros da 
busca, sendo possível buscar por qualquer atributo da entidade Usuario.
- <b>[GET] /api/usuarios/\<int:id>***</b> - Busca e retorna o usuário cujo "id" corresponde ao informado na URI.
- <b>[POST] /api/usuarios**</b> - Cadastra um novo usuário. Deverão ser obrigatoriamente informados os atributos da 
entidade Usuario cujo preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[PATCH | PUT] /api/usuarios/\<int:id>***</b> - Atualiza os atributos de um pedido já cadastrado cujo "id" 
corresponde ao informado na URI. Deverão ser obrigatoriamente informados os atributos da entidade Usuario cujo 
preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[DELETE] /api/usuarios/\<int:id>***</b> - Exclui um usuário existente cujo "id" corresponde ao informado na URI.

[*] O endpoint requer que o usuário esteja autenticado.

[**] O endpoint requer que o usuário esteja autenticado e seja um administrador.

[***] O endpoint requer que o usuário esteja autenticado e seja um administrador, ou esteja autenticado e o seu "id" 
seja o mesmo do parâmetro da requisição.

### Frontend (SPA)

- <b>/</b> - Página inicial da aplicação.
- <b>/login</b> - Página contendo o formulário para login do usuário na aplicação.
- <b>/pedidos*</b> - Página contendo o formulário para busca, cadastro, alteração e exclusão de pedidos.
- <b>/relatorios*</b> - Página contendo um formulário de busca de pedidos por "Data de Envio ao Financeiro", com a 
possibilidade de exportação do resultado da busca para PDF.
- <b>/alterar-senha*</b> - Página contendo um formulário para alteração da senha do usuário atualmente autenticado.
- <b>/usuarios**</b> - Página contendo um formulário de cadastro de usuários e uma tabela com os usuários atualmente
cadastrados, permitindo a redefinição de senha e exclusão do usuário.

[*] A rota requer que o usuário esteja autenticado.

[**] A rota requer que o usuário esteja autenticado e seja um administrador.

## Referências Bibliográficas