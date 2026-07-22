# 💰 Budget Control System

Sistema de controle de vendas, comandas e estoque desenvolvido com **Java Spring Boot** no backend e **React + Vite** no frontend.

O objetivo do projeto é facilitar o gerenciamento de produtos, vendas rápidas e comandas, oferecendo também um painel com indicadores e histórico de vendas.

---

## 🚀 Tecnologias

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend
- React
- Vite
- Axios
- React Router

---

## ✨ Funcionalidades

### 📦 Produtos
- Cadastro de produtos
- Edição de produtos
- Ativar e desativar produtos
- Controle de estoque

### 🛒 Vendas
- Venda rápida
- Abertura de comandas
- Adicionar produtos à comanda
- Remover produtos da comanda
- Fechamento de comandas
- Atualização automática do estoque

### 📊 Dashboard
- Faturamento do dia
- Faturamento do mês
- Quantidade de vendas
- Comandas abertas

### 📋 Histórico de vendas
- Listagem completa
- Pesquisa por cliente
- Filtro por tipo
- Filtro por status
- Filtro por período
- Resumo com:
  - Quantidade de vendas
  - Faturamento
  - Ticket médio
  - Quantidade de comandas

---

## 📸 Telas

- Dashboard
- Produtos
- Cadastro de Produto
- Edição de Produto
- Nova Venda
- Comandas
- Histórico de Vendas
- Detalhes da Venda

> *(Adicionar screenshots futuramente.)*

---

## 🗂 Estrutura

```
backend/
 ├── controller
 ├── dto
 ├── entity
 ├── exception
 ├── mapper
 ├── repository
 └── service

frontend/
 ├── components
 ├── pages
 ├── services
 ├── styles
 └── routes
```

---

## ⚙ Como executar

### Backend

Clone o projeto

```bash
git clone https://github.com/PP950/budget-control-system.git
```

Entre na pasta

```bash
cd backend
```

Configure o banco de dados no arquivo:

```
application.properties
```

Execute:

```bash
./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

---

### Frontend

Entre na pasta

```bash
cd frontend
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm run dev
```

---

## 🗄 Banco de Dados

O projeto utiliza **MySQL**.

Crie um banco de dados:

```sql
CREATE DATABASE budget_control;
```

Configure as credenciais no `application.properties`.

---

## 🎯 Objetivo

Este projeto foi desenvolvido com fins de estudo e para aplicação prática dos conhecimentos em:

- Java
- Spring Boot
- React
- APIs REST
- Banco de Dados
- Desenvolvimento Full Stack

---

## 👨‍💻 Autor

**Paulo Poças**

Estudante de Engenharia de Software na FIAP.

GitHub:
https://github.com/PP950
