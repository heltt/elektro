import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function create(request: Request, response: Response) {
    try {
        const cliente = await prisma.cliente.create({ data: request.body });
        response.status(201).json(cliente);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function read(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } });
        response.status(200).json(cliente);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function readAll(request: Request, response: Response) {
    try {
        const clientes = await prisma.cliente.findMany();
        response.status(200).json(clientes);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function update(request: Request, response: Response) {
    const { id } = request.params;
    try {
        const cliente = await prisma.cliente.update({
            where: { id: Number(id) },
            data: request.body,
        });
        response.status(200).json(cliente);
    } catch (error) {
        response.status(500).json({ error });
    }
}

async function destroy(request: Request, response: Response) {
    const { id } = request.params;
    try {
        await prisma.cliente.delete({ where: { id: Number(id) } });
        response.status(204).send();
    } catch (error) {
        response.status(500).json({ error });
    }
}

export default { create, read, readAll, update, destroy };