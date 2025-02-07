import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
console.log(Object.keys(prisma));

class CupomController {
    public async create(req: Request, res: Response) {
        try {
            const { clienteId } = req.params; // O cupom ao ser criado é atribuído a um cliente
            const { codigo, tipo, validade, descricao, carrinhoId } = req.body;

            const cliente = await prisma.cliente.findUnique({
                where: { id: Number(clienteId) },
            });

            if (!cliente) {
                res.status(404).json({ error: "Cliente não encontrado" });
                return;
            }

            let cupomData: any = {
                codigo,
                tipo,
                validade: new Date(validade),
                descricao,
                cliente: { connect: { id: Number(clienteId) } }, 
            };

            if (carrinhoId) {
                const carrinho = await prisma.carrinho.findUnique({
                    where: { id: Number(carrinhoId) },
                });

                if (!carrinho) {
                    res.status(404).json({ error: "Carrinho não encontrado" });
                    return;
                }

                cupomData.carrinho = { connect: { id: Number(carrinhoId) } };
            }

            const cupom = await prisma.cupom.create({ data: cupomData });

            res.status(201).json({
                message: "Cupom criado com sucesso",
                cupom,
            });
        } catch (error) {
            console.error("Erro ao criar cupom:", error);
            res.status(400).json({ error: "Erro ao criar cupom" });
        }
    }
    
    public async read(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const cupom = await prisma.cupom.findUnique({
                where: { id: Number(id) },
                include: { cliente: true, carrinho: true },
            });

            if (!cupom) {
                res.status(404).json({ error: "Cupom não encontrado" });
                return;
            }

            res.status(200).json(cupom);
        } catch (error) {
            console.error("Erro ao buscar cupom:", error);
            res.status(400).json({ error: "Erro ao buscar cupom" });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { codigo, tipo, validade, descricao, carrinhoId } = req.body;

            const cupomExists = await prisma.cupom.findUnique({
                where: { id: Number(id) },
            });

            if (!cupomExists) {
                res.status(404).json({ error: "Cupom não encontrado" });
                return;
            }

            let updateData: any = {
                codigo,
                tipo,
                validade: new Date(validade),
                descricao,
            };

            if (carrinhoId) {
                const carrinhoExists = await prisma.carrinho.findUnique({
                    where: { id: Number(carrinhoId) },
                });

                if (!carrinhoExists) {
                    res.status(404).json({ error: "Carrinho não encontrado" });
                    return;
                }

                updateData.carrinho = { connect: { id: Number(carrinhoId) } };
            }

            const cupom = await prisma.cupom.update({
                where: { id: Number(id) },
                data: updateData,
            });

            res.status(200).json({
                message: "Cupom atualizado com sucesso",
                cupom,
            });
        } catch (error) {
            console.error("Erro ao atualizar cupom:", error);
            res.status(400).json({ error: "Erro ao atualizar cupom" });
        }
    }

    public async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const cupom = await prisma.cupom.findUnique({
                where: { id: Number(id) },
            });

            if (!cupom) {
                res.status(404).json({ error: "Cupom não encontrado" });
                return;
            }

            await prisma.cupom.delete({
                where: { id: Number(id) },
            });

            res.status(204).json({ message: "Cupom deletado com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar cupom:", error);
            res.status(400).json({ error: "Erro ao deletar cupom" });
        }
    }

    // Exibe todos os cupons de um usuário
    public async readAll(req: Request, res: Response) {
        try {
            const { clienteId } = req.params;

            // Verifica se o cliente existe
            const clienteExists = await prisma.cliente.findUnique({
                where: { id: Number(clienteId) },
            });

            if (!clienteExists) {
                res.status(404).json({ error: "Cliente não encontrado" });
                return;
            }

            const cupons = await prisma.cupom.findMany({
                where: { clienteId: Number(clienteId) },
                include: { carrinho: true }, 
            });

            res.status(200).json(cupons);
        } catch (error) {
            console.error("Erro ao listar cupons:", error);
            res.status(400).json({ error: "Erro ao listar cupons" });
        }
    }

}

export default new CupomController();