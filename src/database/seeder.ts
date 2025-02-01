import { PrismaClient } from "@prisma/client";
import { clientSeed } from "../models/clientSeed"; 

const prisma = new PrismaClient();

async function main() {
  // Função que gera os dados
  await clientSeed();
  console.log("Banco de dados gerado com dados falsos");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });