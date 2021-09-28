# Controle de Pedidos

Projeto Integrador I (Eixo de Computação) / UNIVESP / Grupo 002

## Sobre a Aplicação

Aplicação desenvolvida para uso do Serviço de Compras da Prefeitura Municipal de Penápolis, visando melhorar a gestão de pedidos de compra e controle interno. A aplicação foi desenvolvida para atendimento ao Projeto Integrado I do Eixo de Computação da UNIVESP do Grupo 002.

## Levantamento de Requisitos Efetuado

O levantamento de requisitos encontra-se no diretório <b>/docs/</b>.

## Sobre o Desenvolvimento

Para o desenvolvimento do Frontend da aplicação foi utilizado o conceito de SPA (Single Page Application) através do Framework VueJs 2, visto que este conceito torna a experiência do usuário mais agradável por evitar carregamentos de página. Este conceito também torna a aplicação mais rápida, pois o website é totalmente carregado pelo navegador ao abrir a página, reduzindo o número de requisições ao Backend.

Em relação à estilização da aplicação, foi utilizada a biblioteca de estilos Bootstrap 5 (versão estável mais recente no momento), pois ela traz uma enorme gama de componentes CSS (Cascading Style Sheets) já configurados e padronizados, deixando a aplicação com uma aparência uniforme, melhorando e experiência do usuário.

Para o desenvolvimento do Backend da aplicação (API) foi utilizado o Framework Flask por ser um framework leve e limpo, e também devido à sua facilidade de configuração e implantação. Foi cogitado o uso do Django como Backend, porém devido a ele ser mais robusto, muitas das suas ferramentas built-in (ferramentas padrões do Framework) não seriam utilizadas no projeto, tornando a aplicação desnecessariamente mais pesada, ou poluída. Também foi cogitada a utilização da linguagem PHP como Backend, através do Framework Laravel ou Lumen, entretanto devido à linguagem Python ter se mostrado mais limpa e versátil durante as aulas, foi descartada esta ideia.

A autenticação de usuários da aplicação utiliza JWTs (JSON Web Tokens), que consiste num método RCT 7519 padrão da indústria para realizar autenticação entre duas partes através de um token assinado que autentica uma requisição ‘web’. Esse token é um código em Base64 que armazena um objeto JSON com os dados que permitem a autenticação da requisição.

Durante o desenvolvimento da aplicação e testes foi utilizado o banco de dados Sqlite3 devido à sua versatilidade, dado que ele é simplesmente um arquivo, independente de instalação de qualquer outro ‘software’ para ser lido ou executado.

A aplicação está hospedada no servidor do Heroku, visto que ele é gratuito (salvo se a aplicação for de grande escala e necessitar de mais recursos, pois alguns recursos são pagos), e está disponível em: https://controle-de-pedidos-pmp.herokuapp.com.

No ambiente de produção está em uso o banco de dados PostgreSQL, pois o mesmo é disponibilizado de forma gratuita pelo Heroku (com algumas limitações: 20 conexões simultâneas e 10.000 registros), e atende perfeitamente ao escopo do projeto.

Para controle de versão foi utilizada a ferramenta Git, por ela ser totalmente gratuita e atender às necessidades do escopo do projeto. Também, para compartilhamento dos arquivos foi utilizado um repositório no GitHub, por ele ser totalmente compatível com o Git, ser gratuito e atender às necessidades para o desenvolvimento do projeto em grupo.

## Frameworks, Bibliotecas e Pacotes Utilizados

### Backend

- <b>Flask: </b> Framework desenvolvido em linguagem Python utilizado para desenvolvimento do backend.
- <b>Flask-Migrate: </b> Biblioteca utilizada para criação de migrations para criação do banco de dados.
- <b>Flask-SQLAlchemy: </b> Biblioteca utilizada para comunicação com o banco de dados.
- <b>Flask-JWT-Extended: </b> Biblioteca utilizada para manipulação e autenticação do backend, utilizando tokens de acesso JWT (JSON Web Token).
- <b>Python-DotEnv: </b> Biblioteca utilizada para carregamento de variáveis de ambiente de arquivos '.env', utilizados para configuração da aplicação.
- <b>Werkzeug: </b> Biblioteca utilizada para criptografia de senhas.
- <b>Click: </b> Biblioteca utilizada para auxílio na criação de comandos CLI.
- <b>Gunicorn: </b> Biblioteca utilizada para executar a aplicação em ambientes UNIX. Neste projeto, utiliza-se ela para a execução da aplicação no ambiente de hospedagem do Heroku.
- <b>Psycopg2: </b> Biblioteca utilizada pelo Flask-SQLAlchemy para comunicação com bancos de dados PostgreSQL.

### Frontend

- <b>Vue: </b> Framework desenvolvido em linguagem JavaScript utilizado para desenvolver a SPA (Single Page Application) do frontend.
- <b>Vue-Router: </b> Pacote utilizado para manipulação e gestão de rotas.
- <b>Vuex: </b> Pacote utilizado para manipulação e gestão do estado da aplicação. Neste projeto, foi utilizado apenas para a gestão da autenticação da aplicação.
- <b>Axios: </b> Pacote utilizado para manipulação de requisições AJAX para comunicação com o backend.
- <b>Lodash: </b> Pacote de helpers (funções de ajuda), tais como conversão de strings do formato snake_case para camelCase e vice-versa.
- <b>Yup: </b> Pacote utilizado para validação de formulários.
- <b>ESLint: </b> Pacote utilizado para padronização do código e evidenciação de alguns bugs. Neste projeto, foi utilizado o padrão Airbnb.
- <b>Bootstrap: </b> Framework CSS utilizado para estilização dos componentes da aplicação.
- <b>PopperJs: </b> Pacote utilizado pelo framework Bootstrap para exibição de toasts.
- <b>JsPDF: </b> Pacote utilizado para criação de arquivos PDFs.
- <b>JsPDF-AutoTable: </b> Pacote de plugin do JsPDF utilizado para criação de tabelas em arquivos PDFs.
- <b>Sass e Sass-Loader: </b> Pacotes de compiladores utilizado para a compilação dos estilos da aplicação escritos em SCSS (Syntactically Awesome Style Sheets).

## Banco de Dados

### Modelo Conceitual

O objetivo do Modelo Conceitual é criar um modelo de forma gráfica, sendo este chamado de Diagrama Entidade e Relacionamento (DER), que identifica todas as entidades e relacionamentos de uma forma global. Nele é evitado qualquer detalhamento específico do modelo de Banco de dados. A sua principal finalidade é capturar os requisitos de informação e regras de negócio sob o ponto de vista do negócio.

![image](docs/Modelo%20Conceitual.png)

### Modelo Lógico

O Modelo Lógico é necessário para compilar os requisitos de negócio e representar os requisitos como um modelo. Ele está principalmente associado à coleta de necessidades de negócios, e não ao design do banco de dados. O Modelo Lógico escreve como os dados serão armazenados no banco e também os seus relacionamentos.

![image](docs/Modelo%20Lógico.png)

### Modelo Físico

O Modelo Físico lida com o design do banco de dados real com base nos requisitos reunidos durante a modelagem lógica do banco de dados. Todas as informações coletadas são convertidas em modelos relacionais e modelos de negócios.

![image](docs/Modelo%20Físico.png)

## Rotas / Endpoints

### Backend (API)

- <b>[POST] /api/auth/login</b> - Executa o login do usuário e retorna o token de acesso. Deverão ser obrigatoriamente informados os atributos "email" e "senha".
- <b>[POST] /api/auth/me*</b> - Busca e retorna o usuário atualmente autenticado.


- <b>[GET] /api/pedidos*</b> - Busca e retorna todos os pedidos cadastrados. Poderão ser informados os parâmetros da busca, sendo possível buscar por qualquer atributo da entidade Pedido.
- <b>[GET] /api/pedidos/\<string:tipo>\<int:numero>*</b> - Busca e retorna o pedido cujo "tipo" e "numero" corresponde ao informado na URI.
- <b>[POST] /api/pedidos*</b> - Cadastra um novo pedido. Deverão ser obrigatoriamente informados os atributos da entidade Pedido cujo preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[PATCH | PUT] /api/pedidos/\<string:tipo>\<int:numero>*</b> - Atualiza os atributos de um pedido já cadastrado cujo "tipo" e "numero" corresponde ao informado na URI. Deverão ser obrigatoriamente informados os atributos da entidade Pedido cujo preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[DELETE] /api/pedidos/\<string:tipo>\<int:numero>*</b> - Exclui um pedido existente cujo "tipo" e "numero" corresponde ao informado na URI.


- <b>[GET] /api/usuarios**</b> - Busca e retorna todos os usuários cadastrados. Poderão ser informados os parâmetros da busca, sendo possível buscar por qualquer atributo da entidade Usuario.
- <b>[GET] /api/usuarios/\<int:id>***</b> - Busca e retorna o usuário cujo "id" corresponde ao informado na URI.
- <b>[POST] /api/usuarios**</b> - Cadastra um novo usuário. Deverão ser obrigatoriamente informados os atributos da entidade Usuario cujo preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[PATCH | PUT] /api/usuarios/\<int:id>***</b> - Atualiza os atributos de um pedido já cadastrado cujo "id" corresponde ao informado na URI. Deverão ser obrigatoriamente informados os atributos da entidade Usuario cujo preenchimento seja obrigatório e poderão ser informados os demais atributos.
- <b>[DELETE] /api/usuarios/\<int:id>***</b> - Exclui um usuário existente cujo "id" corresponde ao informado na URI.

[*] O endpoint requer que o usuário esteja autenticado.

[**] O endpoint requer que o usuário esteja autenticado e seja um administrador.

[***] O endpoint requer que o usuário esteja autenticado e seja um administrador, ou esteja autenticado e o seu "id" seja o mesmo do parâmetro da requisição.

### Frontend (SPA)

- <b>/</b> - Página inicial da aplicação.
- <b>/login</b> - Página contendo o formulário para login do usuário na aplicação.
- <b>/pedidos*</b> - Página contendo o formulário para busca, cadastro, alteração e exclusão de pedidos.
- <b>/relatorios*</b> - Página contendo um formulário de busca de pedidos por "Data de Envio ao Financeiro", com a possibilidade de exportação do resultado da busca para PDF.
- <b>/alterar-senha*</b> - Página contendo um formulário para alteração da senha do usuário atualmente autenticado.
- <b>/usuarios**</b> - Página contendo um formulário de cadastro de usuários e uma tabela com os usuários atualmente cadastrados, permitindo a redefinição de senha e exclusão do usuário.

[*] A rota requer que o usuário esteja autenticado.

[**] A rota requer que o usuário esteja autenticado e seja um administrador.

## Estrutura de Arquivos

### Backend (API)

- <b>/docs/</b> - Diretório contendo arquivos auxiliares para elaboração dessa documentação e outros arquivos que foram necessários para o planejamento do desenvolvimento da aplicação.
- <b>/src/</b> - Diretório que contém os principais arquivos do backend (API).
- <b>/src/constants/</b> - Diretório que contém as constantes do backend, ou seja, arquivos que nunca sofrerão alteração e serão usados apenas para humanizar alguns valores lógicos. Neste projeto temos apenas um arquivo, o qual contém todos os códigos de status de resposta HTTP, para um melhor entendimento do que se refere cada código, melhorando a leitura de trechos de códigos da aplicação, devido ao aumento da intuitividade.
- <b>/src/static/</b> - Diretório que contém os arquivos estáticos da aplicação, tais como arquivos CSS, JavaScript, Imagens e Fontes. Os arquivos serão gerados pelo compilador do Vue (frontend) ao compilar a aplicação SPA.
- <b>/src/templates/</b> - Diretório que contém o arquivo de template da aplicação (index.html), o qual servirá como página "base" para a execução do framework Vue, e o seu favicon (favicon.ico). Os arquivos serão gerados pelo compilador do vue (frontend) ao compilar a aplicação SPA.
- <b>/src/\_\_init__.py</b> - Arquivo que contém toda a lógica de inicialização e configuração da aplicação desenvolvida através do framework Flask.
- <b>/src/spa.py</b> - Arquivo que contém toda a lógica das rotas que serão usadas para renderização da aplicação SPA (Vue).
- <b>/src/auth.py</b> - Arquivo que contém toda a lógica das rotas que serão usadas para a autenticação do usuário.
- <b>/src/pedidos.py</b> - Arquivo que contém toda a lógica das rotas que serão usadas para gerenciamento e manipulação dos pedidos no banco de dados.
- <b>/src/usuarios.py</b> - Arquivo que contém toda a lógica das rotas que serão usadas para gerenciamento e manipulação dos usuários no banco de dados.
- <b>/src/commands.py</b> - Arquivo que contém os comandos personalizados da CLI do Flask.
- <b>/src/database.py</b> - Arquivo que contém as entidades (models) da aplicação (Usuario e Pedido), com seus atributos e métodos.
- <b>/src/app.db</b> - Arquivo de banco de dados do Sqlite3, utilizado para desenvolvimento e teste locais, dispensando a necessidade de instalação e configuração de um servidor de banco de dados. Obs.: Este arquivo está configurado para ser ignorado pelo controle de versão.
- <b>/vue/</b> - Diretório contendo a aplicação frontend (não compilada) e as suas dependências. Veremos mais sobre seus subdiretórios na próxima seção.
- <b>/.env.example</b> - Arquivo que contém um modelo de configuração das variáveis de ambiente.
- <b>/.env</b> - Arquivo que contém a configuração das variáveis de ambiente. Obs.: Este arquivo está configurado para ser ignorado pelo controle de versão.
- <b>/.gitignore</b> - Arquivo que contém a lista de diretórios e/ou arquivos que serão ignorados durante o versionamento da aplicação pela ferramenta Git.
- <b>/Pipfile</b> - Arquivo utilizado pela ferramenta de gerenciamento de dependências "pipenv" para salvar as configurações e dependências do projeto.
- <b>/Pipfile.lock</b> - Arquivo gerado automaticamente pelo "pipenv" para gravar (como se fosse um cache da Pipfile) as dependências atualmente instaladas no projeto. Em caso de um deploy da aplicação em um servidor (exemplo: Heroku), o servidor instalará as versões das dependências armazenadas nesta arquivo.
- <b>/Procfile</b> - Arquivo utilizado pelo servidor do Heroku, em que declaramos explicitamente qual comando deve ser executado para iniciar o aplicativo no servidor.
- <b>/wsgi.py</b> - Arquivo que contém a lógica de inicialização da aplicação Flask no servidor Heroku (podendo ser utilizado também em outros servidores).

### Frontend (SPA)

- <b>/node_modules/</b> - Diretório que contém todas as dependências do frontend. Obs.: Este arquivo está configurado para ser ignorado pelo controle de versão.
- <b>/public/</b> - Diretório que contém o arquivo de template da aplicação (index.html), o qual servirá como página "base" para a execução do framework Vue, e o seu favicon (favicon.ico). Ao compilar o frontend, os arquivos deste diretório serão compilados e salvos no diretório <b>/src/templates/</b>, e deles serão removidos comentários e caracteres desnecessários, visando a redução do tamanho dos  arquivos.
- <b>/src/</b> - Diretório que contém os principais arquivos do frontend (SPA).
- <b>/src/assets/</b> - Diretório que contém os arquivos estáticos da aplicação, tais como arquivos Imagens. Ao compilar o frontend, os arquivos deste diretório serão salvos no diretório <b>/src/static/</b>.
- <b>/src/components/</b> - Diretório que contém os componentes que serão utilizados em várias partes da aplicação (ou em várias views/páginas).
- <b>/src/directives/</b> - Diretório que contém as diretivas que serão utilizadas em várias partes da aplicação. Diretivas são basicamente como atributos HTML que são adicionados em tags HTML ou outros componentes. Todos começam com v-, para indicar que é um atributo especial do Vue.
- <b>/src/helpers/</b> - Diretório que contém funções auxiliares que serão utilizadas em várias partes da aplicação. Aqui abstraímos algumas funções para evitar códigos repetitivos de funções utilizadas em vários lugares da aplicação, seguindo o princípio DRY (Don't repeat yourself, ou não se repita), o qual busca reduzir a duplicação de código e os problemas de manutenção resultantes.
- <b>/src/router/</b> - Diretório que contém os arquivos utilizados pelo gerenciador de rotas do Vue (Vue-Router).
- <b>/src/services/</b> - Diretório que contém os serviços utilizados pela aplicação (api: serviço de comunicação com a API; pdf: serviço de geração de arquivos PDF; e toaster: serviço de exibição de toasts, ou notificações). Aqui abstraímos e tranformamos vários conjuntos de funções em serviços, visando evitar códigos repetitivos de funções utilizadas em vários lugares da aplicação, e facilitando a manutenção, uma vez que as funções que são relacionadas estão agrupadas, seguindo também o princípio DRY.
- <b>/src/store/</b> - Diretório que contém os arquivos utilizados pelo gerenciador de estado do Vue (Vuex). Como dito anteriormente, utilizaremos este gerenciador apenas para controle de autenticação do usuário.
- <b>/src/styles/</b> - Diretório que contém toda a lógica de importação de bibliotecas CSS, e contém também os estilos CSS personalizados para a aplicação.
- <b>/src/views/</b> - Diretório que contém os componentes views, ou páginas, da aplicação. Diferentemente dos componentes que estão no diretório <b>/src/components</b>, estes componentes não poderão ser utilizados em várias partes da aplicação.
- <b>/src/App.vue</b> - Arquivo que contém o componente raiz, considerado também como o container, da aplicação. Nele serão renderizadas as views/páginas e os demais componentes. Podemos considerar, analogamente, este arquivo como sendo a tag <b>body</b> de uma página HTML.
- <b>/src/main.js</b> - Arquivo que contém toda a lógica de inicialização e configuração da aplição e suas dependências.
- <b>/.browserlistrc</b> - Arquivo gerado automaticamente pela CLI de criação do Vue, no qual podemos consultar o leque de browsers com suporte à aplicação e as suas versões.
- <b>/.editorconfig</b> - Arquivo gerado automaticamente pela CLI de criação do Vue, o qual define as configurações do plugin EditorConfig, amplamente utilizado por IDEs para padronização de estilos. 
- <b>/.eslintrc.js</b> - Arquivo que consiste nas configuração e regras que serão utilizadas pelo ESLint, para padronizar a formatação do código da aplicação, auxiliando assim em um melhor entendimento do código pelos programadores envolvidos no projeto.
- <b>/.gitignore</b> - Arquivo que contém a lista de diretórios e/ou arquivos que serão ignorados durante o versionamento da aplicação pela ferramenta Git.
- <b>/babel.config.js</b> - Arquivo gerado automaticamente pela CLI de criação do Vue, o qual define as configurações do compilador de JavaScript, Babel.
- <b>/package.json</b> - Arquivo utilizado pela ferramenta de gerenciamento de dependências "npm" (Node Package Manager) para salvar as configurações e dependências do projeto.
- <b>/package-lock.json</b> - Arquivo gerado automaticamente pelo "npm" para gravar (como se fosse um cache do package.json) as dependências atualmente instaladas no projeto. Caso o projeto seja baixado em um novo computador, e seja executado o comando "npm install" (o qual instala as dependências do frontend do projeto), o "npm" instalará as versões das dependências armazenadas nesta arquivo.
- <b>/vue.config.js</b> - Arquivo que contém as configurações personalizadas que serão utilizadas pelo compilador do Vue.

## Branches (Controle de Versão)

- <b>main</b> - Branch utilizado para o desenvolvimento da aplicação.
- <b>deploy</b> - Branch utilizado para deploy da aplicação. Este branch somente deverá receber merge de versões estáveis da aplicação, e com o frontend já compilado em modo de produção, ou seja, com a aplicação pronta para ser executada no ambiente de produção. O servidor do Heroku está configurado para que sempre que este branch sofrer alterações, ser realizado o deploy no servidor.

## Referências Bibliográficas

FERNANDES, Diego. Git & Github: O que é? Por que? Como iniciar?. ln: Rocketseat. rocketseat. [S.l.]. 1 mai. 2018. Disponível em: https://blog.rocketseat.com.br/iniciando-com-git-github. Acesso em: 20 set. 2021.

LACERDA, Eduardo Cavalcante. Sistemas de Controle de Versão. ln: DevMedia. DevMedia. [S.l.]. 28 mai. 2012. Disponível em: https://www.devmedia.com.br/sistemas-de-controle-de-versao/24574. Acesso em: 20 set. 2021.

LIMA, Guilherme. Django ou Flask: Características, semelhanças e diferenças. ln: AOVS Sistemas de Informática S.A.. alura. [S.l.]. 21 jul. 2020. Disponível em: https://www.alura.com.br/artigos/django-ou-flask. Acesso em: 20 set. 2021.

ACHARYA, Durga Prasad. PHP vs Python: Uma Comparação Detalhada Entre as duas Linguagens. ln: Kinsta Inc. kinsta. [S.l.]. 14 mai. 2021. Disponível em: https://kinsta.com/pt/blog/php-vs-python. Acesso em: 20 set. 2021.

Django e Laravel: Qual é o melhor framework para desenvolvimento web?. ln: ByLearn. ByLearn. [S.l.]. 11 out. 2020. Disponível em: https://dojo.bylearn.com.br/python/django-e-laravel. Acesso em: 21 set. 2021.

BRENDON, Hudson. Gerenciando suas dependências e ambientes python com pipenv. ln: Hudson Brendon. Hudson Brendon. [S.l.]. 30 jan. 2017. Disponível em: https://medium.com/@hudsonbrendon/gerenciando-suas-depend%C3%AAncias-e-ambientes-python-com-pipenv-9e5413513fa6. Acesso em: 21 set. 2021.

ROBERTS, Sam. Why and how to use ESLint in your project: Linting your JavaScript project is important: ESLint can help. ln: IBM. IBM Developer. [S.l.]. 17 nov. 2020. Disponível em: https://developer.ibm.com/articles/why-and-how-to-use-eslint-in-your-project. Acesso em: 22 set. 2021.

SAREEN, Shivangi. RESTful APIs in Python: What are RESTful APIs and implementing GET in Python. ln: Towards Data Science Inc.. towards data science. Canada, 11 abr. 2020. Disponível em: https://towardsdatascience.com/restful-apis-in-python-121d3763a0e4. Acesso em: 22 set. 2021.

BAILÃO, Juliano. Por que utilizamos Single Page Applications – SPA?. ln: iMasters. iMasters. [S.l.]. 3 jan. 2019. Disponível em: https://imasters.com.br/front-end/por-que-utilizamos-single-page-applications-spa. Acesso em: 22 set. 2021.

OLIVEIRA, Mauro. Otimização na utilização do Axios. ln: Mauro Oliveira. Deblogger. [S.l.]. 11 mar. 2021. Disponível em: http://deblogger.com.br/otimizacao-na-utilizacao-do-axios. Acesso em: 22 set. 2021.

Single Page Application (SPA) vs Multi Page Application (MPA): Two Development Approaches. ln: Asper Brothers. Asper Brothers. [S.l.]. 12 nov. 2019. Disponível em: https://asperbrothers.com/blog/spa-vs-mpa. Acesso em: 23 set. 2021.

FIGUEIREDO, Erik. O que é uma SPA: Single-Page Application?. ln: School of Net Internet, Sistemas e Tecnologia Ltda. School of Net. [S.l.]. 26 jul. 2018. Disponível em: https://blog.schoolofnet.com/o-que-e-uma-spa-single-page-application. Acesso em: 23 set. 2021.

OLIVEIRA, Daniel de Jesus. Uma proposta de arquitetura para Single-Page Applications. Orientador: Kiev Santos da Gama. 2017. 47 f. TCC (Graduação) - Curso de Ciência da Computação, Universidade Federal de Pernambuco Centro de Informática, Recife, 2017. Disponível em: https://www.cin.ufpe.br/~tg/2017-2/djo-tg.pdf. acesso em: 23 set. 2021.

DAITYARI, Shaumik. Angular vs React vs Vue: Which Framework to Choose in 2021. ln: CodeinWP. codeinwp. [S.l.]. 15 mar. 2021. Disponível em: https://www.codeinwp.com/blog/angular-vs-vue-vs-react. Acesso em: 23 set. 2021.

PICOLLO, Lucas. Vue JS: o que é, como funciona e vantagens. ln: GeekHunter. GeekHunter. [S.l.]. 13 abr. 2020. Disponível em: https://blog.geekhunter.com.br/vue-js-so-vejo-vantagens-e-voce. Acesso em: 24 set. 2021.

FERREIRA, Silvio Henrique. Por que escolhemos Vue.js. ln: Rock Content. Experience Valley. San Pedro Valley, 20 dez. 2017. Disponível em: https://medium.com/experience-valley/por-que-escolhemos-vue-js-c0bf9bd6cb5. Acesso em: 24 set. 2021.

SOUZA, Ivan de. O que é SQLite, por que ele é usado, e o que o diferencia do MySQL?. ln: Rock Content. rockcontent. [S.l.]. 24 nov. 2020. Disponível em: https://rockcontent.com/br/blog/sqlite. Acesso em: 25 set. 2021.

NASCIMENTO, Wellington. Entendendo tokens JWT (Json Web Token). ln: Diego Eis. Tableless. [S.l.]. 11 mar. 2018. Disponível em: https://tableless.com.br/entendendo-tokens-jwt. Acesso em: 25 set. 2021.

SANTOS, Lucas. JWT: Usando tokens para comunicação eficiente. ln: Training Center. Training Center. [S.l.]. 23 out. 2017. Disponível em: https://medium.com/trainingcenter/jwt-usando-tokens-para-comunica%C3%A7%C3%A3o-eficiente-cf0551c0dd99. Acesso em: 25 set. 2021.

MONTANHEIRO, Lucas Souza; CARVALHO, Ana Maria Martins; RODRIGUES, Jackson Alves. Utilização de JSON Web Token na Autenticação de Usuários em APIs REST. XIII Encontro Anual de Computação: EnAComp 2017 - UFG, [s. l.], p. 186-193, 2017. Disponível em: https://www.enacomp.com.br/2017/docs/json_web_token_api_rest.pdf. Acesso em: 26 set. 2021.

CATON, Lucas. 6 motivos para usar o PostgreSQL em vez do MySQL. ln: Lucas Caton. Lucas Caton. [S.l.]. 31 jan. 2018. Disponível em: https://www.lucascaton.com.br/2018/01/31/6-motivos-para-usar-o-postgresql-em-vez-do-mysql. Acesso em: 27 set. 2021.

RUSEV, Konstantin. What is Heroku and What is it Used For?. ln: MentorMate, Inc.. Mentormate. [S.l.]. 31 dez. 2020. Disponível em: https://mentormate.com/blog/what-is-heroku-used-for-cloud-development. Acesso em: 27 set. 2021.

Deploying Python Applications with Gunicorn. ln: Heroku. Heroku Dev Center. [S.l.]. 3 jun. 2020. Disponível em: https://devcenter.heroku.com/articles/python-gunicorn. Acesso em: 28 set. 2021.

MOURYS, Naincy. Tailwind CSS vs. Bootstrap: Which Is a Better Framework?. ln: MUO. makeuseof. [S.l.]. 7 jul. 2021. Disponível em: https://www.makeuseof.com/tailwind-css-vs-bootstrap-which-is-a-better-framework. Acesso em: 28 set. 2021.