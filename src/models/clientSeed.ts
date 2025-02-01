import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/pt_BR"; 

const prisma = new PrismaClient();

interface ClienteData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
}

let clientesData: ClienteData[] = [];

for (let i = 0; i < 20; i++) {
  clientesData.push({
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    telefone: faker.phone.number(),
    senha: faker.internet.password(),
  });
}

export async function clientSeed() {
  for (const cliente of clientesData) {
    const createdCliente = await prisma.cliente.create({
      data: cliente,
    });

    const numPedidos = faker.number.int({ min: 1, max: 10 });
    for (let j = 0; j < numPedidos; j++) {
      const pedido = await prisma.pedido.create({
        data: {
          valorTotal: parseFloat(faker.commerce.price({min:10, max:500, dec:2})),
          endereco: faker.location.streetAddress(),
          cep: faker.location.zipCode(),
          numero: faker.number.int({ min: 1, max: 500 }).toString(),
          bairro: faker.location.city(),
          cidade: faker.location.city(),
          pagamento: faker.helpers.arrayElement(['Cartão de Crédito', 'Boleto', 'Pix']),
          clienteId: createdCliente.id, 
        },
      });

      const numProdutos = faker.number.int({ min: 1, max: 3 });
      for (let k = 0; k < numProdutos; k++) {
        const produto = await prisma.produto.create({
          data: {
            nome: faker.commerce.productName(),
            descricao: faker.commerce.productDescription(),
            preco: parseFloat(faker.commerce.price({min:10, max:500, dec:2})),
            qtdEstoque: faker.number.int({ min: 1, max: 100 }),
            cor: faker.color.human(),
          },
        });

        await prisma.pedidoProduto.create({
          data: {
            pedidoId: pedido.id,
            produtoId: produto.id,
          },
        });
      }
    }
  }
}