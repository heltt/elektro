import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class ProdutoController {
    public async create(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;
            const { nome, descricao, preco, cor} = req.body;

            const cliente = await prisma.cliente.findUnique({
                where: { id: Number(clienteId) },
            });

            if (!cliente) {
                res.status(404).json({ error: "Cliente não encontrado" });
                return;
            }

            const produto = await prisma.produto.create({
                data: {
                    nome,
                    descricao,
                    preco: parseFloat(preco),
                    cor,
                    clienteId: Number(clienteId),
                },
            });

            res.status(201).json(produto);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(400).json({ error: "Erro ao criar produto" });
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const produto = await prisma.produto.findUnique({
                where: { id: Number(id) },
            });

            if (!produto) {
                res.status(404).json({ error: "Produto não encontrado" });
                return;
            }

            res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            res.status(400).json({ error: "Erro ao buscar produto" });
        }
    }

    public async readAll(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;

            const cliente = await prisma.cliente.findUnique({
                where: { id: Number(clienteId) },
            });

            if (!cliente) {
                res.status(404).json({ error: "Cliente não encontrado" });
                return;
            }
            const produtos = await prisma.produto.findMany({
                where: { clienteId: Number(clienteId) },
            });

            res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            res.status(400).json({ error: "Erro ao listar produtos" });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, descricao, preco, cor } = req.body;

            const produto = await prisma.produto.update({
                where: { id: Number(id) },
                data: { nome,
                    descricao,
                    preco: parseFloat(preco),
                    cor },
            });

            res.status(200).json(produto);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            res.status(400).json({ error: "Erro ao atualizar produto" });
        }
    }

    public async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.produto.delete({
                where: { id: Number(id) },
            });

            res.status(200).json({ message: "Produto deletado com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(400).json({ error: "Erro ao deletar produto" });
        }
    }
}

export default new ProdutoController();