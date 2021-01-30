## Resumo FRONTEND
**ReactJS**


## Primeiros passso:

Rodar a instalação: **npm install**
Rodar o projeto: **npm start**

## Docker

O projeto consiste também com uma semi-dockerização.
Pode também gerar uma imagem no docker com o seguinte comando: **docker build -t <nome_da_imagem_que_quiser> .**
Após a montagem da imagem, rodar: **docker run <nome_da_imagem>**
E pronto, nossa api estará rodando via docker.

## MongoDB
Para subir o mongodb para o docker, basta: **docker compose up**
Os acessos para o banco estão no arquivo **.env.example** com as variaveis de ambiente, sujeito a criação do arquivo **.env** para funcionar

## Acesso para testar via Postman ou Frontend

**Email:** pessoalize@pessoa.com.br
**Senha:** teste123

Se for via postman, necessário passar o token no **Authorization** para que possa fazer qualquer procedimento, seja ele: Editar, listar, cadastrar ou deletar.
No frontend o token ta sendo guardado no localStorage, e da mesma forma se for deletado do localStorage não será possivel ter acesso as telas da aplicação.


## Postman
A api foi toda criada e testada via postman, realizando todos os processos: (Listar, deletar, edição, criar)

Algumas rotas de exemplo para testes futuros:


Metodo GET:

http://localhost:3000/product

Metodo CREATE:

http://localhost:3000/product/create

Método PUT:
http://localhost:3000/product/update?productID=6011add97b95b9438c5ddf25


Metodo DELETE:

http://localhost:3000/product/delete?productID=6011add97b95b9438c5ddf25


Quaisquer dúvidas fico a disposição.

Matheus Mendes