# Desafio Técnico - Sistema de Gerenciamento de Ordens de Produção para uma Fábrica

O projeto consiste em desenvolver um sistema de gerenciamento de ordens de produção para uma fábrica. 

O sistema deve permitir que os usuários registrem novas ordens de produção, listem todas as ordens existentes, verifiquem se o produto pode ser produzido com base nos materiais disponíveis, atualizem o status de uma ordem de produção e visualizem relatórios de produção.

Para isso, o sistema deve ter um banco de dados que armazene informações sobre os materiais disponíveis, os produtos a serem fabricados, as ordens de produção registradas e o status de cada ordem. O sistema deve permitir que os usuários cadastrem novos materiais e produtos, além de atualizarem as informações existentes.

# Informações sobre Tecnicas utilizadas
O sistema foi desenvolvido utilizando as seguintes tecnologias:

*Node.js: Foi utilizado o Node.js na versão LTS 18.18.2 como ambiente de execução do sistema.

*Sequelize: Foi utilizado o Sequelize como ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados. O Sequelize permite definir os modelos de dados e suas relações, além de fornecer métodos para manipulação do banco de dados.

*Migrations: Utilizei o conceito de Migrations para controlar as alterações no banco de dados de forma estruturada. As Migrations permitem criar, modificar e excluir tabelas e campos no banco de dados de forma segura e controlada, muito utilizada em aplicações grande/médio porte.

*SQLite: Utilizamos o SQLite como banco de dados para armazenar os dados do sistema. O SQLite é uma opção leve e fácil de configurar, ideal para projetos menores.

*Tratamento de Erros: Para evitar a repetição de código e tratar erros de forma centralizada, utilizamos o conceito de captura de exceções e rejeições (process.on()) do Node.js. Dessa forma, qualquer exceção ou rejeição não tratada será capturada e tratada de forma adequada, permitindo que o sistema continue em execução sem vazamentos de erros.

*Validações: Para tratar as validações de entrada do usuário, utilizamos blocos de condições com expressões regulares (Regex), entre outros meios. Embora seja uma abordagem mais simples, para um projeto maior seria o mais viável o uso de bibliotecas como o Yup para tratamento de validações mais complexas.

*Limpeza do Console: Para limpar o console a cada pergunta, foi usado o método process.stdout.write('\u001B[2J\u001B[0;0f'). Esse código emite sequências de caracteres especiais que são interpretadas pelo terminal como uma instrução para limpar a tela. Isso ajuda a manter o console limpo e organizado durante a interação com o sistema.

## Funcionalidades

O sistema já vem com alguns dados de exemplo pré-cadastrados no banco de dados, incluindo:

Materiais: 30 unidades de madeira, 10 unidades de corda e 20 unidades de carvão. É possível cadastrar novos materiais para controle de estoque (Dizendo qual o material, e a quantidade do mesmo).
Produtos: Escada (requer 5 unidades de madeira e 2 unidades de corda para ser produzida) e Fogueira (requer 5 unidades de madeira e 5 unidades de carvão para ser produzida). É possível cadastrar novos produtos (Dizendo qual o produto, qual o material, quantidade de material necessaria).
Ordens: Não há nenhuma ordem cadastrada inicialmente. É possível criar novas ordens de produção.

## Inicialização do Projeto

Para iniciar o projeto do zero, sem nenhum dado pré-cadastrado, siga os seguintes passos:

Apague o arquivo 'development.db' localizado na raiz do projeto.
Execute os seguintes comandos no terminal:

npm install
npm run db:migrate
npm run start

Para iniciar o projeto com os dados de exemplo pré-cadastrados, basta executar os seguintes comandos no terminal:

npm install
npm run start

## Navegação no Sistema

Após iniciar o sistema, você poderá navegar pelas opções fornecidas pelo sistema para adicionar, consultar e controlar os dados cadastrados.

Sinta-se à vontade para explorar as funcionalidades e utilizar as opções disponíveis para interagir com o sistema.


### Pré-requisitos
Para construção desse desafio foi utilizado.
- Node version: 18.18.2
- npm (Packager Manager)
