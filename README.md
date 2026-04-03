# Site de Gerenciamento de Alunos e Turmas

Plataforma web full-stack para gerenciamento completo de alunos, turmas e inscrições. O sistema oferece uma API RESTful robusta com Spring Boot e uma interface moderna desenvolvida em React/TypeScript, permitindo cadastro de alunos, gerenciamento de turmas, inscrições e consultas com paginação avançada.

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=java&logoColor=white)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## Funcionalidades

- 👥 **Gerenciamento de Alunos** — Cadastro, edição, exclusão e consulta de alunos com paginação
- 📚 **Gerenciamento de Turmas** — Criação e administração de turmas por disciplina
- 📝 **Sistema de Inscrições** — Inscrição de alunos em turmas com validação de disponibilidade
- 🔍 **Pesquisa Avançada** — Filtros por disciplina, turma e busca por nome/matrícula
- 📄 **Paginação Dinâmica** — Interface responsiva com navegação entre páginas
- 🔐 **API RESTful Segura** — Endpoints bem estruturados com tratamento de exceções
- 🎨 **Interface Moderna** — UI intuitiva com Bootstrap e ícones Bootstrap Icons
- 🌍 **CORS Configurado** — Suporte a requisições entre domínios
- 🗄️ **Banco de Dados Robusto** — MySQL com relacionamentos bem definidos

---

## Pré-requisitos

### Backend (API)

- **Java 21+** — Verifique com `java -version`
- **Maven 3.6+** — Build tool para o projeto Spring Boot. Verifique com `mvn -version`
- **MySQL 8.0+** — Banco de dados relacional. Crie um banco chamado `gerenciamento_alunos`

### Frontend (Web)

- **Node.js 18+** — Runtime JavaScript. Verifique com `node --version`
- **npm 9+** ou **pnpm** — Gerenciador de pacotes. Verifique com `npm --version`

### Ambiente

- Variáveis de ambiente MySQL (`MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`)
- Porta 8080 disponível para a API (Spring Boot)
- Porta 5173 disponível para o frontend em desenvolvimento (Vite)

---

## Estrutura do Projeto

```
Site-de-Gerenciamento-de-Alunos-e-Turmas/
│
├── Trabalho-2 - ApiRestful - Pedro Almeida e Joao Cecim/  # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/carlosribeiro/apirestful/
│   │   │   │   ├── ApirestfulApplication.java             # Classe principal
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java                    # Configuração CORS
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AlunoController.java
│   │   │   │   │   ├── DisciplinaController.java
│   │   │   │   │   ├── InscricaoController.java
│   │   │   │   │   ├── ProfessorController.java
│   │   │   │   │   └── TurmaController.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── EntidadeEmUsoException.java
│   │   │   │   │   ├── EntidadeNaoEncontradaException.java
│   │   │   │   │   └── GlobalExceptionHandler.java        # Tratamento global de erros
│   │   │   │   ├── model/
│   │   │   │   │   ├── Aluno.java
│   │   │   │   │   ├── Turma.java
│   │   │   │   │   ├── Disciplina.java
│   │   │   │   │   ├── Inscricao.java
│   │   │   │   │   ├── Professor.java
│   │   │   │   │   └── DTOs (AlunoDTO, etc.)
│   │   │   │   ├── repository/
│   │   │   │   │   ├── AlunoRepository.java
│   │   │   │   │   ├── TurmaRepository.java
│   │   │   │   │   ├── DisciplinaRepository.java
│   │   │   │   │   └── InscricaoRepository.java
│   │   │   │   └── service/
│   │   │   │       ├── AlunoService.java
│   │   │   │       ├── TurmaService.java
│   │   │   │       ├── DisciplinaService.java
│   │   │   │       ├── InscricaoService.java
│   │   │   │       └── ProfessorService.java
│   │   │   └── resources/
│   │   │       └── application.properties              # Configurações da aplicação
│   │   └── test/
│   │       └── java/com/carlosribeiro/apirestful/
│   │           └── ApirestfulApplicationTests.java
│   ├── pom.xml                                         # Dependências Maven
│   └── mvnw                                            # Maven wrapper
│
└── Uff-Des-Web-React-projeto13/                        # Frontend (React + TypeScript)
    ├── src/
    │   ├── main.tsx                                    # Entrada da aplicação
    │   ├── index.css                                   # Estilos globais
    │   ├── components/
    │   │   ├── AlunoForm.tsx                           # Formulário de aluno
    │   │   ├── AlunoComboBox.tsx
    │   │   ├── TabelaDeAlunos.tsx
    │   │   ├── TabelaDeAlunosPorTurma.tsx
    │   │   ├── TabelaDeTurmas.tsx
    │   │   ├── TurmaComboBox.tsx
    │   │   ├── DisciplinaComboBox.tsx
    │   │   ├── InscricaoForm.tsx
    │   │   ├── Paginacao.tsx                           # Componente de paginação
    │   │   ├── Pesquisa.tsx                            # Barra de busca
    │   │   ├── NavBar.tsx                              # Navegação
    │   │   └── ...
    │   ├── hooks/
    │   │   ├── useRecuperarTodosAlunos.tsx
    │   │   ├── useRecuperarAlunosComPaginacao.tsx
    │   │   ├── useRecuperarTodasTurmas.tsx
    │   │   ├── useRecuperarTurmasComPaginacao.tsx
    │   │   ├── useRecuperarAlunosDaTurma.tsx
    │   │   ├── useRemoverAlunoPorId.tsx
    │   │   ├── useRemoverTurmaPorId.tsx
    │   │   └── ...
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── AlunoPage.tsx
    │   │   ├── AlunosComPaginacaoPage.tsx
    │   │   ├── CadastrarAlunoPage.tsx
    │   │   ├── TurmasComPaginacaoPage.tsx
    │   │   ├── TurmaDetalhePage.tsx
    │   │   ├── InscricaoPage.tsx
    │   │   ├── ErrorPage.tsx
    │   │   └── ...
    │   ├── interfaces/
    │   │   ├── Aluno.ts
    │   │   ├── Turma.ts
    │   │   ├── Disciplina.ts
    │   │   ├── Inscricao.ts
    │   │   ├── Professor.ts
    │   │   └── ResultadoPaginado.ts
    │   ├── routes/
    │   │   ├── router.tsx                              # Configuração de rotas
    │   │   └── Layout.tsx
    │   ├── store/
    │   │   └── InscricaoStore.ts                       # Gerenciamento de estado
    │   └── util/
    │       ├── recuperarAlunos.ts
    │       └── recuperarTurmas.ts
    ├── package.json                                    # Dependências npm
    ├── vite.config.ts                                  # Configuração Vite
    ├── tsconfig.json                                   # Configuração TypeScript
    └── index.html                                      # Entrada HTML

```

### Dependências Principais

#### Backend (Spring Boot 3.3.3)

```xml
<!-- Web & API -->
spring-boot-starter-web         # REST APIs
spring-boot-starter-data-jpa    # Persistência de dados

<!-- Banco de Dados -->
mysql-connector-j               # Driver MySQL

<!-- Utilitários -->
lombok                          # Reduz boilerplate (getters/setters)
spring-boot-starter-actuator    # Métricas e monitoramento

<!-- Testes -->
spring-boot-starter-test        # JUnit, Mockito
```

#### Frontend (React + TypeScript + Vite)

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.8.2",
  "@tanstack/react-query": "^5.90.1",
  "zustand": "^4.3.10",
  "bootstrap": "^5.3.8",
  "bootstrap-icons": "^1.13.1",
  "zod": "^3.23.2",
  "dayjs": "^1.11.18",
  "vite": "^7.1.2",
  "typescript": "~5.8.3"
}
```

---

## Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/Gurkan22/Site-de-Gerenciamento-de-Alunos-e-Turmas.git
cd Site-de-Gerenciamento-de-Alunos-e-Turmas
```

### 2. Configure o Backend (Spring Boot)

#### 2.1 Navegue até a pasta do backend

```bash
cd "Trabalho-2 - ApiRestful - Pedro Almeida e Joao Cecim"
```

#### 2.2 Crie o banco de dados MySQL

```bash
mysql -u root -p
```

```sql
CREATE DATABASE gerenciamento_alunos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gerenciamento_alunos;
```

#### 2.3 Configure as credenciais do MySQL

Edite `src/main/resources/application.properties`:

```properties
spring.application.name=apirestful
spring.datasource.url=jdbc:mysql://localhost:3306/gerenciamento_alunos
spring.datasource.username=root
spring.datasource.password=sua_senha_aqui
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

#### 2.4 Baixe as dependências e construa o projeto

```bash
mvn clean install
```

#### 2.5 Execute a aplicação

```bash
mvn spring-boot:run
```

A API estará disponível em: **http://localhost:8080**

Verifique com:

```bash
curl http://localhost:8080/actuator/health
```

### 3. Configure o Frontend (React)

#### 3.1 Abra um novo terminal e navegue até a pasta do frontend

```bash
cd Uff-Des-Web-React-projeto13
```

#### 3.2 Instale as dependências

```bash
npm install
```

ou com pnpm:

```bash
pnpm install
```

#### 3.3 Configure a URL da API (se necessário)

Verifique o arquivo `src/util/recuperarAlunos.ts` e `src/util/recuperarTurmas.ts` para garantir que apontam para `http://localhost:8080`.

#### 3.4 Inicie o servidor de desenvolvimento

```bash
npm run dev
```

ou com pnpm:

```bash
pnpm dev
```

O frontend estará disponível em: **http://localhost:5173**

---

## Build & Geração de Executáveis

### Backend (Produção)

#### Gerar JAR executável

```bash
cd "Trabalho-2 - ApiRestful - Pedro Almeida e Joao Cecim"
mvn clean package -DskipTests
```

O arquivo JAR estará em:

```
target/trabalho2-apirestful-pedro-almeida-joao-cecim-0.0.1-SNAPSHOT.jar
```

#### Executar o JAR

```bash
java -jar target/trabalho2-apirestful-pedro-almeida-joao-cecim-0.0.1-SNAPSHOT.jar
```

### Frontend (Produção)

#### Gerar build otimizado

```bash
cd Uff-Des-Web-React-projeto13
npm run build
```

Os arquivos estáticos estarão em:

```
dist/
```

#### Servir os arquivos estáticos

Use um servidor web como `nginx`, `Apache` ou instale `http-server`:

```bash
npm install -g http-server
http-server dist -p 3000
```

---

## Uso da Aplicação

### Fluxo Principal

1. **Acesse a página inicial** em `http://localhost:5173`
2. **Navegue pelos alunos** — Visualize, cadastre e edite alunos
3. **Gerencie turmas** — Crie e administre turmas por disciplina
4. **Realize inscrições** — Inscreva alunos em turmas disponíveis
5. **Pesquise e filtre** — Use os filtros para encontrar alunos e turmas

### Endpoints Principais da API

#### Alunos

```bash
GET     /alunos                          # Listar todos os alunos
GET     /alunos?page=0&size=10          # Listar com paginação
GET     /alunos/{id}                     # Detalhes do aluno
POST    /alunos                          # Criar aluno
PUT     /alunos/{id}                     # Atualizar aluno
DELETE  /alunos/{id}                     # Deletar aluno
```

#### Turmas

```bash
GET     /turmas                          # Listar todas as turmas
GET     /turmas?page=0&size=10          # Listar com paginação
GET     /turmas/{id}                     # Detalhes da turma
GET     /turmas/disciplina/{disciplinaId}  # Turmas por disciplina
POST    /turmas                          # Criar turma
PUT     /turmas/{id}                     # Atualizar turma
DELETE  /turmas/{id}                     # Deletar turma
```

#### Inscrições

```bash
GET     /inscricoes                      # Listar todas as inscrições
POST    /inscricoes                      # Criar inscrição
DELETE  /inscricoes/{id}                 # Remover inscrição
```

#### Disciplinas

```bash
GET     /disciplinas                     # Listar todas as disciplinas
GET     /disciplinas/{id}                # Detalhes da disciplina
```

#### Professores

```bash
GET     /professores                     # Listar todos os professores
GET     /professores/{id}                # Detalhes do professor
```

---

## Problemas Comuns e Soluções

| Problema                          | Solução                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| Erro de conexão MySQL             | Verifique se MySQL está rodando e credenciais em `application.properties`                 |
| Porta 8080 já está em uso         | Mude a porta em `application.properties`: `server.port=8081`                              |
| Porta 5173 já está em uso         | Vite usará a próxima porta disponível automaticamente                                     |
| CORS error no frontend            | Verifique `CorsConfig.java` e certifique-se de que `http://localhost:5173` está permitido |
| Dependências Maven não baixam     | Execute `mvn clean` e tente novamente                                                     |
| Node modules corrompido           | Delete `node_modules` e `package-lock.json`, depois `npm install`                         |
| Erro "database not found"         | Crie o banco: `CREATE DATABASE gerenciamento_alunos;`                                     |
| Hot reload não funciona (React)   | Salve o arquivo novamente ou reinicie o servidor com `npm run dev`                        |
| Tipos TypeScript não reconhecidos | Execute `npm install` para sincronizar tipos e dependências                               |

---

## Desenvolvimento

### Executar com hot reload (Backend)

```bash
cd "Trabalho-2 - ApiRestful - Pedro Almeida e Joao Cecim"
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.devtools.restart.enabled=true"
```

### Executar com hot reload (Frontend)

```bash
cd Uff-Des-Web-React-projeto13
npm run dev
```

Alterações são refletidas automaticamente no navegador.

### Analisar código (Frontend)

```bash
npm run lint
```

### Estrutura de Rotas (Frontend)

O projeto utiliza React Router para navegação. Principais rotas:

```
/                               → Página inicial
/alunos                        → Lista de alunos
/alunos/paginacao              → Alunos com paginação
/alunos/cadastrar              → Cadastrar novo aluno
/turmas                        → Lista de turmas
/turmas/paginacao              → Turmas com paginação
/turmas/:id                    → Detalhes da turma
/turmas/combo                  → Turmas com seletor de alunos
/turmas/busca                  → Busca avançada de turmas
/inscricoes                    → Gerenciamento de inscrições
/erro                          → Página de erro
```

---

## Notas para Produção

- Teste ambas as aplicações (backend e frontend) em modo release/build antes de publicar
- Configure variáveis de ambiente adequadas para produção (banco de dados, URLs, etc.)
- Use um reverse proxy (nginx) para servir backend e frontend juntos
- Implemente autenticação e autorização se necessário
- Configure HTTPS/SSL para comunicação segura
- Considere usar Docker para containerizar ambas as aplicações
- Monitore a saúde da aplicação com `/actuator/health` do Spring Boot
- Faça backup regular do banco de dados MySQL
- Configure logging adequado em ambas as aplicações
- Use variáveis de ambiente para credenciais sensíveis (nunca commite secrets no Git)

---

## Autores

Desenvolvido por graduandos em Ciência da Computação da Universidade Federal Fluminense (UFF), Brasil, Rio de Janeiro.

- **Pedro Lucas Almeida dos Santos**
- **João Vitor Carvalho Cecim** 

---

