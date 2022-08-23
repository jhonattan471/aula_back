import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import superagent from 'superagent'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
  res.send(new Pessoa('teste1','teste2'));
});

app.get('/cep', async (req: Request, res: Response) => {
  const result = await superagent.get('viacep.com.br/ws/01001000/json/');
  console.log(result.body)
  res.send({...result.body, teste:'from express'});
});

// 

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


class Pessoa {
  nome:string = 'John';
  sobrenome:string = "Doe";

  constructor(nome,sobrenome){
    this.nome = nome + ' ' + sobrenome
  }
}