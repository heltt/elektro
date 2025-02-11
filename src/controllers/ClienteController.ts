import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import auth from '../config/auth';
import { Mailer } from "../config/mailer";

const prisma = new PrismaClient();

class ClienteController {
    public async create(req: Request, res: Response) {
        try {
          const { nome, email, cpf, telefone, senha} = req.body;
          const { hash, salt } = auth.generatePassword(senha)
          const cliente = await prisma.cliente.create({
            data: { nome, email, cpf, telefone, hash, salt},
          });
          const token = auth.generateJWT(cliente);
          res.status(201).json({
            message: "Cliente criado com sucesso",
            cliente: cliente,
            token: token
          });
        } catch (error) {
          res.status(400).json({error: "Erro ao criar cliente"});
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await prisma.cliente.findUnique({
                where: { id: Number(id) },
            });
    
            if (!cliente){
                res.status(404).json({ error: "Cliente não encontrado" });
            }
            else{
                res.status(200).json(cliente);
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar cliente" });
        }
    }

    public async readAll(req: Request, res: Response) {
        try {
            const clientes = await prisma.cliente.findMany();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar clientes"});
        }
    }

    public async update(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const { nome, email, cpf, telefone} = req.body;
    
          const cliente = await prisma.cliente.update({
            where: { id: Number(id) },
            data: { nome, email, cpf, telefone},
          });
          Mailer.sendEmail("sylviopastene@gmail.com","Nodemailer","Seus dados foram alterados.");
          res.status(200).json(cliente);
        } catch (error) {
          res.status(400).json({ error: "Erro ao atualizar cliente" });
        }
    }

    public async destroy(req: Request, res: Response) {
        try {
          const id  = req.user;
          const cliente = await prisma.cliente.delete({
            where: { id: Number(id) },
          });
    
          res.status(204).json(cliente);
        } catch (error) {
          res.status(400).json({ error: "Erro ao deletar cliente" });
        }
    }
}

export default new ClienteController();