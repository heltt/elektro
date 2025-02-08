import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PedidoController {
    public async create(req: Request, res: Response) {
        try {
            const { carrinhoId } = req.params;
            const { endereco, cep, numero, bairro, cidade, pagamento } = req.body;

            const carrinho = await prisma.carrinho.findUnique({
                where: { id: Number(carrinhoId) },
                include: { itens: true, cupom: true },
            });

            if (!carrinho || carrinho.itens.length === 0) {
                res.status(400).json({ error: "Carrinho vazio ou inexistente" });
                return;
            }

            const pedido = await prisma.pedido.create({
                data: {
                    cliente: { connect: { id: carrinho.clienteId } },
                    produtos: { connect: carrinho.itens.map(produto => ({ id: produto.id })) },
                    valorTotal: carrinho.valorTotal,
                    endereco,
                    cep,
                    numero,
                    bairro,
                    cidade,
                    pagamento,
                },
            });

            await prisma.carrinho.update({
                where: { id: carrinho.id },
                data: {
                    itens: { set: [] },
                    valorTotal: 0,
                    cupom: { disconnect: true },
                },
            });

            res.status(201).json({ message: "Pedido criado com sucesso", pedido });
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            res.status(400).json({ error: "Erro ao criar pedido" });
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const { pedidoId } = req.params;

            const pedido = await prisma.pedido.findUnique({
                where: { id: Number(pedidoId) },
                include: { produtos: true, cliente: true },
            });

            if (!pedido) {
                res.status(404).json({ error: "Pedido não encontrado" });
                return;
            }

            res.status(200).json(pedido);
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            res.status(400).json({ error: "Erro ao buscar pedido" });
        }
    }

    public async readAll(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;

            const pedidos = await prisma.pedido.findMany({
                where: { clienteId: Number(clienteId) },
                include: { produtos: true },
                orderBy: { data: "desc" },
            });

            res.status(200).json(pedidos);
        } catch (error) {
            console.error("Erro ao listar pedidos do cliente:", error);
            res.status(400).json({ error: "Erro ao listar pedidos" });
        }
    }

    public async destroy(req: Request, res: Response) {
        try {
            const { pedidoId } = req.params;

            const pedido = await prisma.pedido.findUnique({
                where: { id: Number(pedidoId) },
            });

            if (!pedido) {
                res.status(404).json({ error: "Pedido não encontrado" });
                return;
            }

            await prisma.pedido.delete({
                where: { id: Number(pedidoId) },
            });

            res.status(204).json({ message: "Pedido cancelado com sucesso" });
        } catch (error) {
            console.error("Erro ao cancelar pedido:", error);
            res.status(400).json({ error: "Erro ao cancelar pedido" });
        }
    }
}

export default new PedidoController();