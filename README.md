
# Task Management System

## Descrição

Este projeto é um sistema de gerenciamento de tarefas que permite aos usuários criar, visualizar, atualizar e excluir tarefas associadas a projetos.

## Tecnologias Usadas

- **Node.js**: Plataforma JavaScript de código aberto que permite a execução de JavaScript no lado do servidor.
- **NestJS**: Framework Node.js para a construção de aplicativos eficientes e escaláveis do lado do servidor.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática opcional à linguagem.
- **TypeORM**: ORM (Object-Relational Mapper) para TypeScript e JavaScript.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional de código aberto.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicativos em contêineres.
- **Swagger**: Ferramenta para documentação de APIs.
- **class-transformer**: Biblioteca para transformar objetos entre diferentes classes.
- **class-validator**: Biblioteca para validação de objetos JavaScript usando decoradores.

## Instalação e Execução

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   DB_HOST=mysql
   DB_PORT=3306
   DB_USERNAME=user
   DB_PASSWORD=user_password
   DB_DATABASE=test
   ```

3. **Construa e inicie os contêineres Docker:**

   ```bash
   docker-compose up --build
   ```

4. **Acesse a documentação da API:**

   A documentação do Swagger estará disponível em `http://localhost:3000/api`.

## Estrutura do Projeto

### Entidades

- **Project**: Representa os projetos.
  - `id`: number (Primary Key)
  - `name`: string
  - `startDate`: Date
  - `endDate`: Date

- **Activity**: Representa as atividades dentro dos projetos.
  - `id`: number (Primary Key)
  - `name`: string
  - `startDate`: Date
  - `endDate`: Date
  - `isCompleted`: boolean
  - `projectId`: number (Foreign Key para Project)

### Módulos

- **ProjectModule**: Gerencia projetos.
- **ActivityModule**: Gerencia atividades dentro dos projetos.

## Testes Unitários

Os testes unitários foram implementados para garantir que as operações básicas de CRUD estão funcionando corretamente e que os relacionamentos entre as entidades são mantidos. O framework de testes utilizado é o Jest.

### Executar Testes

Para executar os testes, use o seguinte comando:

```bash
npm run test
```

### Testes Incluídos

Os seguintes módulos foram testados:

- **ProjectModule**:
  - Criação de projetos
  - Listagem de todos os projetos
  - Busca de projeto por ID
  - Atualização de projeto
  - Exclusão de projeto

- **ActivityModule**:
  - Criação de atividades
  - Listagem de todas as atividades
  - Busca de atividade por ID
  - Atualização de atividade
  - Exclusão de atividade
