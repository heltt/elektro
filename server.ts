import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import clienteController from './src/controllers/ClienteController';
import pedidoController from './src/controllers/PedidoController';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/clientes', clienteController.create);
app.get('/clientes', clienteController.readAll);
app.get('/clientes/:id', clienteController.read);
app.put('/clientes/:id', clienteController.update);
app.delete('/clientes/:id', clienteController.destroy);

app.post('/pedidos', pedidoController.create);
app.get('/pedidos', pedidoController.readAll);
app.get('/pedidos/:id', pedidoController.read);
app.put('/pedidos/:id', pedidoController.update);
app.delete('/pedidos/:id', pedidoController.destroy);

app.get('/', (req: Request, res: Response) => {
  res.send('API Funcionando!');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});