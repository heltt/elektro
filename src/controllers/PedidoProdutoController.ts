import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function adicionarProdutoAoPedido(request: Request, response: Response) {
    try {
        const pedidoProduto = await prisma.pedidoProduto.create({ data: request.body });
        response.status(201).json(pedidoProduto);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function listarProdutosDoPedido(request: Request, response: Response) {
    const { pedidoId } = request.params;
    try {
        const produtos = await prisma.pedidoProduto.findMany({
            where: { pedidoId: Number(pedidoId) },
            include: { produto: true },
        });
        response.status(200).json(produtos);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function removerProdutoDoPedido(request: Request, response: Response) {
    const { id } = request.params;
    try {
        await prisma.pedidoProduto.delete({ where: { id: Number(id) } });
        response.status(204).send();
    } catch (error) {
        response.status(500).json({ error });
    }
}

export default { adicionarProdutoAoPedido, listarProdutosDoPedido, removerProdutoDoPedido };