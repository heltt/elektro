import { Router } from 'express';

import CarrinhoController from '../controllers/CarrinhoController';
import ClienteController from '../controllers/ClienteController';
import CupomController from '../controllers/CupomController';
import FavoritoController from '../controllers/FavoritoController';
import PedidoController from '../controllers/PedidoController';
import ProdutoController from '../controllers/ProdutoController';

import { ClienteValidator, ProdutoValidator } from '../config/validator';
import { ResultValidator } from '../middlewares/ResultValidator';
import { photoUpload } from "../config/uploader";
import passport from 'passport';


const routes = Router();


// Rotas de cliente
routes.post("/cliente", ClienteValidator.validateCliente("create"), ResultValidator.validateResult, ClienteController.create);
routes.get("/clientes", ClienteController.readAll);
routes.get("/cliente", passport.authenticate('jwt', {session:false}), ClienteController.read);
routes.put("/cliente", ClienteValidator.validateCliente("update"),
                       ResultValidator.validateResult,
                       passport.authenticate('jwt', {session:false}),
                       ClienteController.update);

routes.delete("/cliente", passport.authenticate('jwt', {session:false}), ClienteController.destroy);


// Rotas de cupons
routes.get("/cupons/:id", CupomController.read);
routes.put("/cupons/:id", CupomController.update);
routes.delete("/cupons/:id", CupomController.destroy);
routes.post("/cliente/addCupom", passport.authenticate('jwt', {session:false}), CupomController.create);
routes.get("/cliente/meusCupons", passport.authenticate('jwt', {session:false}), CupomController.readAll);


// Rotas de produtos
routes.get("/produtos/:id", ProdutoController.read);
routes.post("/cliente/novoProduto", ProdutoValidator.validateProduto("create"),
                                    ResultValidator.validateResult,
                                    passport.authenticate('jwt', {session:false}),
                                    ProdutoController.create);
routes.get("/cliente/meusProdutos", passport.authenticate('jwt', {session:false}), ProdutoController.readAll);
routes.put("/cliente/meusProdutos/:id", ProdutoValidator.validateProduto("update"),
                                        ResultValidator.validateResult,
                                        passport.authenticate('jwt', {session:false}),
                                        ProdutoController.update);
routes.delete("/cliente/meusProdutos/:id", passport.authenticate('jwt', {session:false}), ProdutoController.destroy);
routes.post("/cliente/meusProdutos/:produtoId/addImg", passport.authenticate('jwt', {session:false}), photoUpload.single("imagem"))


// Rotas de favoritos
routes.post("/cliente/novoFavorito/:produtoId", passport.authenticate('jwt', {session:false}), FavoritoController.create);
routes.get("/favoritos/:id", FavoritoController.read);
routes.get("/cliente/meusFavoritos", passport.authenticate('jwt', {session:false}),FavoritoController.readAll);
routes.delete("/cliente/meusFavoritos/:id", passport.authenticate('jwt', {session:false}),FavoritoController.destroy);


// Rotas de carrinho
routes.post("/carrinho", passport.authenticate('jwt', {session:false}), CarrinhoController.create);
routes.get("/carrinho", passport.authenticate('jwt', {session:false}), CarrinhoController.read);
routes.put("/carrinho/clear", passport.authenticate('jwt', {session:false}), CarrinhoController.clearCarrinho);
routes.put("/carrinho/addProduto/:produtoId", passport.authenticate('jwt', {session:false}), CarrinhoController.addProduto);
routes.put("/carrinho/removeProduto/:produtoId", passport.authenticate('jwt', {session:false}), CarrinhoController.removeProduto);
routes.put("/carrinho/applyCupom/:cupomId", passport.authenticate('jwt', {session:false}), CarrinhoController.applyCupom);


// Rotas de pedido
routes.post("/pedido/:carrinhoId", PedidoController.create);
routes.get("/pedido/:pedidoId", PedidoController.read);
routes.get("/cliente/pedidos/", passport.authenticate('jwt', {session:false}), PedidoController.readAll);
routes.delete("/pedido/:pedidoId", PedidoController.destroy);


export default routes;