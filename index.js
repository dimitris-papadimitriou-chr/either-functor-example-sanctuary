import { log, logger1 } from "./log";
import { Client } from "./Client.js";
import * as S from "sanctuary";

var Clients = [new Client(1, "jim"), new Client(2, "jane")];

var Repository = {
  getById: id => S.head(Clients.filter(client => client.id == id)) //returns a S.Just<T>
};

{
  logger1.h1().log("Using Either curried composition");
  // composing functions
  var getClientNameById = id =>
    S.either(e => `error : ${e}`)(result => `client name:${result}`)(
      S.maybeToEither(`no client found`)(
        S.map(Client.name)(Repository.getById(id))
      )
    );

  log(getClientNameById(1));
  log(getClientNameById(2));
  log(getClientNameById(3));
}

{
  logger1.h1().log("Using pipe");
  //using pipe
  var getClientNameById = id =>
    S.pipe([
      S.maybeToEither(`no client found`),
      S.map(Client.name),
      S.either(e => `error : ${e}`)(result => `client name:${result}`) //this is the pattern matching paradoxically
    ])(Repository.getById(id));

  log(getClientNameById(1));
  log(getClientNameById(2));
}

{
  logger1.h1().log("Using pipe-point free");
  //using pipe and totaly point free (removed the (id)=>...)
  var getClientNameById = S.pipe([
    Repository.getById,
    S.maybeToEither(`no client found`),
    S.map(Client.name),
    S.either(e => `error : ${e}`)(result => `client name:${result}`) //this is the pattern matching paradoxically
  ]);

  log(getClientNameById(1));
  log(getClientNameById(2));
}
