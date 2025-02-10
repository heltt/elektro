import {body, param, ValidationChain} from 'express-validator';


export class ClienteValidator{
    public static validateCliente(crudMethod: string){
        switch(crudMethod){
            case "create":
                return[
                    body("email")
                    .exists()
                    .trim()
                    .isEmail(),
        
                    body("nome")
                    .exists()
                    .trim()
                    .isLength({min:4}),

                ]
            break;
            default:
                return [];
            break;
        }
    }
}