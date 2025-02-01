import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function create(request: Request, response: Response) {
    try {
        const produto = await prisma.produto.create({ data: request.body });
        response.status(201).json(produto);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function read(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const produto = await prisma.produto.findUnique({ where: { id: Number(id) } });
        response.status(200).json(produto);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function readAll(request: Request, response: Response) {
    try {
        const produtos = await prisma.produto.findMany();
        response.status(200).json(produtos);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function update(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const produto = await prisma.produto.update({
            where: { id: Number(id) },
            data: request.body,
        });
        response.status(200).json(produto);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function destroy(request: Request, response: Response) {
    const { id } = request.params;
    try {
        await prisma.produto.delete({ where: { id: Number(id) } });
        response.status(204).send();
    } catch (error) {
        response.status(500).json({ error });
    }
}

export default { create, read, readAll, update, destroy };