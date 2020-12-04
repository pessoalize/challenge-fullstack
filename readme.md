# Desafio Pessoalize Full Stack

## Criar uma API de produtos com autenticação e rotas protegidas

Criar uma API com suporte a criação, edição, exclusão e leitura, usando o arquivo example.json como refêrencia.
A autenticação deve ser [JWT](https://jwt.io/).

## Frontend
Front-end deve ser feito em react

## O que será avaliado:

- Arquitetura escolhida para desenvolvimento do teste.
- Qualidade e simplicidade do código.
- Funcionamento do produto entregue.
- Seguir o padrão RESTful.
- Socket

##### Endpoints

- Endpoint de login (JWT)
- Endpoint de cadastro
- Socket de listagem
- Endpoint de edição
- Endpoint de exclusão

### A solução DEVE conter

- Manual do setup no readme.md
- Autorização do usuário
- A listagem deve ser feita em socket, sempre que um produto for adicionado
esse produto deve aparecer na listagem automaticamente

### **Ganha + pontos se conter**

- Cobertura com [Jest](https://jestjs.io/) (ou qualquer outra ferramenta)
- Setup do projeto com docker
- Variáveis de environment setadas por ambiente (não hard coded)

### Sugestões

- Utilizar https://expressjs.com/
- Utilizar MongoDB e conectar/mapear com Mongoose https://mongoosejs.com/

### Processo de submissão

- Faça um fork deste projeto em sua conta no [Github](https://github.com/join)
- Em seguida, desenvolva o projeto em seu repositório.
- Submeta um PR

_Boa sorte!_
