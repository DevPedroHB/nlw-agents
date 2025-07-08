# NLW Agents - Let me Ask

## 📋 Índice

- [NLW Agents - Let me Ask](#nlw-agents---let-me-ask)
  - [📋 Índice](#-índice)
  - [📖 Sobre o Projeto](#-sobre-o-projeto)
  - [✨ Funcionalidades](#-funcionalidades)
  - [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
  - [🏁 Como Executar](#-como-executar)
  - [📝 Licença](#-licença)

---

## 📖 Sobre o Projeto

O **Let me Ask** é uma plataforma interativa projetada para facilitar a criação e gerenciamento de salas de perguntas e respostas. É ideal para eventos, palestras ou qualquer situação onde a interação com o público é fundamental. A aplicação foi construída utilizando uma arquitetura de monorepo com Turborepo, separando o back-end, front-end e pacotes compartilhados.

## ✨ Funcionalidades

- **Criação de Salas:** Usuários podem criar salas temáticas.
- **Sistema de Perguntas:** Envio e listagem de perguntas em tempo real.
- **Interação:** Funcionalidades para destacar ou marcar perguntas como respondidas.
- **Autenticação:** (A ser implementado) Sistema de login para gerenciamento das salas.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

| Área | Tecnologia | Descrição |
|---|---|---|
| **API** | **Fastify** | Framework web focado em performance e baixo overhead. |
| | **Drizzle ORM** | ORM TypeScript moderno e seguro para interação com o banco de dados. |
| | **PostgreSQL** | Banco de dados relacional utilizado para persistir os dados. |
| | **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **WEB** | **React** | Biblioteca para construção de interfaces de usuário. |
| | **Vite** | Ferramenta de build moderna e ultrarrápida para o desenvolvimento front-end. |
| | **TypeScript** | Garante a segurança e a manutenibilidade do código. |
| | **Tailwind CSS** | Framework CSS utility-first para estilização rápida e customizável. |
| | **TanStack Query** | Gerenciamento de estado de servidor, cache e sincronização de dados. |
| **Monorepo** | **Turborepo** | Sistema de build de alta performance para monorepos. |
| | **pnpm** | Gerenciador de pacotes rápido e eficiente com o espaço em disco. |
| **Infra** | **Docker** | Plataforma para desenvolvimento, deploy e execução de aplicações em contêineres. |

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura de monorepo para gerenciar o código de forma centralizada, facilitando o compartilhamento de lógica e tipos entre as aplicações.

```
/
├── apps/
│   ├── api/      # Back-end (Fastify)
│   └── web/      # Front-end (React + Vite)
├── packages/
│   ├── db/       # Configuração do Drizzle ORM e schema do banco
│   └── env/      # Gerenciamento de variáveis de ambiente com Zod
└── ...
```

## 🏁 Como Executar

Siga os passos abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en/) (versão 20.x ou superior)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started)

**Passos:**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/DevPedroHB/nlw-agents.git
   cd nlw-agents
   ```

2. **Instale as dependências:**

   ```bash
   pnpm i
   ```

3. **Configure as variáveis de ambiente:**
   - Navegue até o pacote `env` e copie o arquivo `.env.example` para `.env`.
   - Preencha as variáveis de ambiente conforme necessário.

4. **Inicie o banco de dados com Docker:**

   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco:**

   ```bash
   cd packages/db
   pnpm run db:migrate
   ```

6. **Inicie a aplicação:**

   ```bash
   pnpm run dev
   ```

Após esses passos, a aplicação web estará disponível em `http://localhost:5173` e a API em `http://localhost:3333`.

## 📝 Licença

Este projeto está licenciado sob a licença do [MIT](https://choosealicense.com/licenses/mit).

---

Feito com ❤️ por Pedro Henrique Bérgamo 🚀 [Never stop learning!](https://github.com/DevPedroHB)
