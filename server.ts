import express from 'express';
import configDotenv from './src/config/dotenv';
import routes from './src/routes/routes';  // Importando as rotas do arquivo routes.ts
import passport from 'passport';
import configAuth from './src/middlewares/checkAuth'

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

configAuth();
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 
app.use(passport.initialize()) 
app.use(express.urlencoded({ extended: true }));
app.use(routes)


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});