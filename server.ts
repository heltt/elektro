import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/routes';  // Importando as rotas do arquivo routes.ts

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());  // Middleware para parsing de JSON  // Usando as rotas com prefixo /api
app.use(express.urlencoded({ extended: true }));
app.use(router)


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});