// const http = require("http");
// aplicacoes http que sao nossas APIs
// padrao de importação communjs .. que e o padrao utilizando require (que e o mais antigo)
// hoje em dia usa-se ESmodules que sao import/export

//atraves da criaçao de rotas  e feita a ligaçao de quem irar consumir a nossas apis
// geralmente por onde o front entra , sendo uma rota para cada funcionalidae por ex
//-criar usuario
//-listagem de usuario
//-edição de usuario
//-remoçao de usuario

//como funciona uma requisição http , que basicamente e composta por dois recursos
//-Metodo HTTP
//-URL
//import http from "node:http";
// metodos comumentes usados nas requisiçoes http

//- GET -POST -PUT -PATCH - DELETE
// GET --> BUSCAR UMA INFORMAÇÃO/RECURSO NO BACK-END
// POST--> CIRAR  UMA INFORMAÇÃO/RECURSO NO BACK-END
// PUT --> SEMPRE QUE FOR ATUALIZAR UMA INFORMAÇÃO/RECURSO NO BACK-END
// patch --> ATUALIZAR UMA INFROMAÇÃO UNICA OU RECURSO ESPECIFICA NO BACK-END
// DELETE --> PARA DELETAR ALGUMA INFORMAÇAO/RECURSO NO BACK-END

// GET/user => buscando um usuario no back-end
//POST/user => criando um usurario no back-end

//statefull - stateless - (algum tipo de informação guardada em memoria .)-(nao salva nada em memoria
// e ultiliza dados arguivo de banco de dados ou dispositivos de armazenamentos externos e independete se for parada nao se perde o conteudo)

//JASON -JavaScript Object Notation - usado para transitar dados como string

//cabeçalhos- sao metadados(infromaçoes) adicionais do dado enviado

//http satus code - tem que informar  como o codigo esta assim q startado se deu erro se rodou qual o erro  seguindo o  as nomras

import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });
  if (route) {
    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});
server.listen(3333);
// ESTE comando server para o nosso servidor ouça a porta 3333 do nosso local holst
