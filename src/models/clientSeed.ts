import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/pt_BR"; 
import auth from '../config/auth';
const prisma = new PrismaClient();

interface ClienteData {
  nome: string;
  email: string;
  hash: string;
  salt: string;
  cpf: string;
  telefone: string;
}

let clientesData: ClienteData[] = [];

for (let i = 0; i < 20; i++) {
    
  const password = faker.internet.password();
  const {hash, salt} = auth.generatePassword(password);
  clientesData.push({
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    hash: hash,
    salt: salt,
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    telefone: faker.phone.number()
  });
}

export async function clientSeed() {
  for (const cliente of clientesData) {
    const createdCliente = await prisma.cliente.create({
      data: cliente,
    });
  }
}