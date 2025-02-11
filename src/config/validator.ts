import {body, param, ValidationChain} from 'express-validator';


export class ClienteValidator{
    public static validateCliente(crudMethod: string){
        switch(crudMethod){
            case "create":
                return[
                    body("nome")
                    .exists()
                    .trim()
                    .isLength({min:4, max: 30}),

                    body("email")
                    .exists()
                    .trim()
                    .isEmail(),
        
                    body("cpf")
                    .exists()
                    .trim()
                    .isNumeric()
                    .isLength({min: 11, max:11}),

                    body("telefone")
                    .exists()
                    .trim()
                    .isNumeric()
                    .isLength({min: 10, max:11}),

                    body("senha")
                    .exists()
                    .trim()
                    .isLength({min:8, max: 20}),
                ]

            case "update":
                return[
                    body("nome")
                    .exists()
                    .trim()
                    .isLength({min:4, max: 30}),

                    body("email")
                    .exists()
                    .trim()
                    .isEmail(),
        
                    body("cpf")
                    .exists()
                    .trim()
                    .isNumeric()
                    .isLength({min: 11, max:11}),

                    body("telefone")
                    .exists()
                    .trim()
                    .isNumeric()
                    .isLength({min: 10, max:11}),
                ]

            default:
                return [];
            break;
        }
    }
}

export class ProdutoValidator{
    public static validateProduto(crudMethod: string){
        switch(crudMethod){
            case "create":
                return[
                    body("nome")
                    .exists()
                    .trim()
                    .isLength({min:4, max: 30}),

                    body("descricao")
                    .exists()
                    .trim()
                    .isLength({min:10, max: 200}),
        
                    body("preco")
                    .exists()
                    .trim()
                    .isFloat({min: 1, max:99999}),

                    body("cor")
                    .optional()
                    .trim()
                    .isAlpha()
                    .isLength({min: 3, max:20}),
                ]

            case "update":
                return[
                    body("nome")
                    .exists()
                    .trim()
                    .isLength({min:4, max: 30}),

                    body("descricao")
                    .exists()
                    .trim()
                    .isLength({min:10, max: 200}),
        
                    body("preco")
                    .exists()
                    .trim()
                    .isFloat({min: 1, max:99999}),

                    body("cor")
                    .optional()
                    .trim()
                    .isAlpha()
                    .isLength({min: 3, max:20}),
                ]

            default:
                return [];
            break;
        }
    }
}