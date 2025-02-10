import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export class ResultValidator{
    public static validateResult(req:Request, res:Response, next:NextFunction){
        try{
            const validationErros = validationResult(req);
            if(!validationErros.isEmpty()){
                res.status(400).json({erros:validationErros.array()})
            }
            next()
        }catch(error: any){
            res.status(500).json({message:error.message})
        }

    }
}