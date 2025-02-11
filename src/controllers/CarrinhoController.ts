import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class CarrinhoController {
    public async create(req: Request, res: Response) {
        try {
            const clienteId = req.user;

            const carrinhoExistente = await prisma.carrinho.findUnique({
                where: { clienteId: Number(clienteId) },
            });

            if (carrinhoExistente) {
                res.status(400).json({ error: "Cliente já possui um carrinho" });
                return;
            }

            const carrinho = await prisma.carrinho.create({
                data: {
                    cliente: { connect: { id: Number(clienteId) } },
                    valorTotal: 0,
                },
            });

            res.status(201).json({ message: "Carrinho criado com sucesso", carrinho });
        } catch (error) {
            console.error("Erro ao criar carrinho:", error);
            res.status(400).json({ error: "Erro ao criar carrinho" });
        }
    }

    public async addProduto(req: Request, res: Response) {
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

            const carrinho = await prisma.carrinho.update({
                where: { clienteId: Number(clienteId) },
                data: {
                    itens: { connect: { id: Number(produtoId) } },
                    valorTotal: { increment: produto.preco }, 
                },
            });

            res.status(200).json({ message: "Produto adicionado ao carrinho", carrinho });
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho:", error);
            res.status(400).json({ error: "Erro ao adicionar produto ao carrinho" });
        }
    }

    public async removeProduto(req: Request, res: Response) {
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

            const carrinho = await prisma.carrinho.update({
                where: { clienteId: Number(clienteId) },
                data: {
                    itens: { disconnect: { id: Number(produtoId) } },
                    valorTotal: { decrement: produto.preco }, 
                },
            });

            res.status(200).json({ message: "Produto removido do carrinho", carrinho });
        } catch (error) {
            console.error("Erro ao remover produto do carrinho:", error);
            res.status(400).json({ error: "Erro ao remover produto do carrinho" });
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const clienteId = req.user;
    
            const carrinho = await prisma.carrinho.findUnique({
                where: { id: Number(clienteId) },
                include: { itens: true, cupom: true },
            });

            if (!carrinho) {
                res.status(404).json({ error: "Carrinho não encontrado" });
                return;
            }

            res.status(200).json(carrinho);
        } catch (error) {
            console.error("Erro ao obter carrinho:", error);
            res.status(400).json({ error: "Erro ao obter carrinho" });
        }
    }

    public async clearCarrinho(req: Request, res: Response) {
        try {
            const clienteId = req.user;
    
            const carrinho = await prisma.carrinho.findUnique({
                where: { clienteId: Number(clienteId) },
            });
    
            if (!carrinho) {
                res.status(404).json({ error: "Carrinho não encontrado" });
                return;
            }
    
            const carrinhoAtualizado = await prisma.carrinho.update({
                where: { id: carrinho.id },
                data: {
                    itens: { set: [] },
                    valorTotal: 0,
                },
            });
    
            res.status(200).json({ message: "Carrinho esvaziado com sucesso", carrinho: carrinhoAtualizado });
        } catch (error) {
            console.error("Erro ao esvaziar carrinho:", error);
            res.status(400).json({ error: "Erro ao esvaziar carrinho" });
        }
    }

    public async applyCupom(req: Request, res: Response) {
        try {
            const { cupomId } = req.params;
            const clienteId = req.user;

            const cupom = await prisma.cupom.findUnique({
                where: { id: Number(cupomId) },
            });

            if (!cupom) {
                res.status(404).json({ error: "Cupom não encontrado" });
                return;
            }

    
            const carrinho = await prisma.carrinho.findUnique({
                where: { clienteId: Number(clienteId) },
            });
    
            if (!carrinho) {
                res.status(404).json({ error: "Carrinho não encontrado" });
                return;
            }

            const carrinhoAtualizado = await prisma.carrinho.update({
                where: { id: Number(carrinho.id) },
                data: {
                    cupom: { connect: { id: Number(cupomId) } },
                },
            });

            res.status(200).json({ message: "Cupom aplicado com sucesso", carrinhoAtualizado });
        } catch (error) {
            console.error("Erro ao aplicar cupom:", error);
            res.status(400).json({ error: "Erro ao aplicar cupom" });
        }
    }
}

export default new CarrinhoController();