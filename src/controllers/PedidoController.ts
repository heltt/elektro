import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function create(request: Request, response: Response) {
    try {
        const pedido = await prisma.pedido.create({ data: request.body });
        response.status(201).json(pedido);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function read(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const pedido = await prisma.pedido.findUnique({
            where: { id: Number(id) },
            include: { cliente: true, produtos: true },
        });
        response.status(200).json(pedido);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function readAll(request: Request, response: Response) {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: { cliente: true, produtos: true },
        });
        response.status(200).json(pedidos);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function update(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const pedido = await prisma.pedido.update({
            where: { id: Number(id) },
            data: request.body,
        });
        response.status(200).json(pedido);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function destroy(request: Request, response: Response) {
    const { id } = request.params;
    try {
        await prisma.pedido.delete({ where: { id: Number(id) } });
        response.status(204).send();
    } catch (error) {
        response.status(500).json({ error });
    }
}

export default { create, read, readAll, update, destroy };