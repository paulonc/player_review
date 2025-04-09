# Backend - Player Review

Este diretório contém o código fonte do backend do projeto Player Review, que foi desenvolvido utilizando **TypeScript**, **Express** e **PostgreSQL**. A API está documentada via **Swagger**, facilitando a integração e o entendimento dos endpoints disponíveis.

## Configuração e Execução

### Pré-requisitos

- Node.js (versão compatível com o projeto)
- PostgreSQL
- [Make](https://www.gnu.org/software/make/) (opcional, para utilização do comando `make run`)

### Instalação

1. Instale as dependências do projeto:
   ```sh
   npm install
   ```
2. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do diretório `backend`. Utilize o arquivo `.env.example` como referência, ajustando as configurações de conexão ao banco de dados e do JWT conforme necessário.

### Executando o Projeto

Para iniciar o servidor, você pode utilizar o comando:
```sh
make run
```
ou, alternativamente:
```sh
npm run dev
```

## Documentação da API

A documentação da API está disponível através do Swagger. Após iniciar o servidor, acesse:
```
http://localhost:<PORT>/api-docs
```
(substitua `<PORT>` pela porta configurada).

## Modelagem de Dados

O sistema utiliza um banco de dados PostgreSQL estruturado da seguinte forma:

### 👤 **Tabela: Usuários (`users`)**

| Campo        | Tipo         | Descrição                      |
| ------------ | ------------ | ------------------------------ |
| `id`         | UUID (PK)    | Identificador único do usuário |
| `username`   | VARCHAR(255) | Nome de usuário                |
| `email`      | VARCHAR(255) | E-mail do usuário              |
| `password`   | TEXT         | Senha criptografada            |
| `role`       | ENUM         | Permissão (`user` ou `admin`)  |
| `created_at` | TIMESTAMP    | Data de criação do registro    |

### ⭐ **Tabela: Avaliações (`reviews`)**

| Campo         | Tipo       | Descrição                                |
| ------------- | ---------- | ---------------------------------------- |
| `id`          | UUID (PK)  | Identificador único da avaliação         |
| `user_id`     | UUID (FK)  | Usuário que fez a avaliação              |
| `game_id`     | UUID (FK)  | Jogo avaliado                            |
| `title`       | TEXT       | Título da avaliação                      |
| `rating`      | INTEGER    | Nota atribuída ao jogo (0 a 5)           |
| `review`      | TEXT       | Texto da resenha                         |
| `hoursPlayed` | INTEGER    | Horas jogadas (opcional)                |
| `recommended` | BOOLEAN    | Indica se o usuário recomenda o jogo     |
| `created_at`  | TIMESTAMP  | Data da avaliação                        |

### 🎮 **Tabela: Jogos (`games`)**

| Campo          | Tipo         | Descrição                              |
| -------------- | ------------ | -------------------------------------- |
| `id`           | UUID (PK)    | Identificador único do jogo            |
| `title`        | VARCHAR(255) | Nome do jogo                           |
| `description`  | TEXT         | Descrição do jogo                      |
| `release_date` | DATE         | Data de lançamento                     |
| `company_id`   | UUID (FK)    | Empresa responsável pelo jogo          |
| `category_id`  | UUID (FK)    | Categoria do jogo                      |
| `imageUrl`     | VARCHAR(255) | URL da imagem do jogo (opcional)       |
| `created_at`   | TIMESTAMP    | Data de criação do registro            |

### 🏢 **Tabela: Empresas (`companies`)**

| Campo        | Tipo         | Descrição                        |
| ------------ | ------------ | -------------------------------- |
| `id`         | UUID (PK)    | Identificador único              |
| `name`       | VARCHAR(255) | Nome da desenvolvedora           |
| `country`    | VARCHAR(255) | País de origem da desenvolvedora |
| `imageUrl`   | VARCHAR(255) | URL da imagem da empresa         |
| `created_at` | TIMESTAMP    | Data de criação do registro      |

### 🧩 **Tabela: Categorias (`categories`)**

| Campo        | Tipo          | Descrição                         |
| ------------ | ------------- | --------------------------------- |
| `id`         | UUID (PK)     | Identificador único da categoria  |
| `name`       | VARCHAR(100)  | Nome da categoria (único)         |
| `created_at` | TIMESTAMP     | Data de criação do registro       |

## Estrutura de Pastas

- **src/**: Código fonte do backend.
- **src/routes/**: Definição dos endpoints da API.
- **src/controllers/**: Lógica de controle dos endpoints.
- **src/models/**: Modelos e integrações com o banco de dados.
- **docs/**: Documentação adicional e imagens (ex.: diagramas).

## Contribuição

Para contribuir com o desenvolvimento do backend, siga as instruções abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Realize os commits com suas alterações: `git commit -m 'Adicionando nova feature'`.
4. Envie sua branch: `git push origin minha-feature`.
5. Abra um Pull Request para revisão.

## Contato

Caso tenha dúvidas ou sugestões, sinta-se à vontade para entrar em contato ou abrir uma issue.