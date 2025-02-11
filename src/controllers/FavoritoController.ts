import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class FavoritoController {
    
    public async create(req: Request, res: Response) {
        try {
            const { produtoId } = req.params;
            const clienteId = req.user;
            const produto = await prisma.produto.findUnique({
                where: { id: Number(produtoId) },
            });

            if (!produto) {
                res.status(404).json({ error: "Produto não encontrado" });
                return;
            }

            const cliente = await prisma.cliente.findUnique({
                where: { id: Number(clienteId) },
            });

            if (!cliente) {
                res.status(404).json({ error: "Cliente não encontrado" });
                return;
            }

            const favorito = await prisma.favorito.create({
                data: {
                    cliente: { connect: { id: Number(clienteId) } }, 
                    produto: { connect: { id: Number(produtoId) } }, 
                },
            });

            res.status(201).json({
                message: "Produto adicionado aos favoritos com sucesso",
                favorito,
            });
        } catch (error) {
            console.error("Erro ao adicionar produto aos favoritos:", error);
            res.status(400).json({ error: "Erro ao adicionar produto aos favoritos" });
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const favorito = await prisma.favorito.findUnique({
                where: { id: Number(id) },
                include: {
                    cliente: true,  
                    produto: true,  
                },
            });

            if (!favorito) {
                res.status(404).json({ error: "Favorito não encontrado" });
                return;
            }

            res.status(200).json(favorito);
        } catch (error) {
            console.error("Erro ao ler favorito:", error);
            res.status(400).json({ error: "Erro ao ler favorito" });
        }
    }

    public async readAll(req: Request, res: Response) {
        try {
            const clienteId = req.user;

            const favoritos = await prisma.favorito.findMany({
                where: { clienteId: Number(clienteId) },
                include: {
                    produto: true,  
                },
            });

            res.status(200).json(favoritos);
        } catch (error) {
            console.error("Erro ao listar favoritos:", error);
            res.status(400).json({ error: "Erro ao listar favoritos" });
        }
    }

    public async destroy(req: Request, res: Response) {
        try {
            const { favoritoId } = req.params;

            const favorito = await prisma.favorito.delete({
                where: { id: Number(favoritoId) },
            });

            res.status(204).json({
                message: "Produto removido dos favoritos com sucesso",
                favorito: favorito,
            });
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
            res.status(400).json({ error: "Erro ao remover favorito" });
        }
    }
}

export default new FavoritoController();