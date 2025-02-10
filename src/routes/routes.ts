import { Router } from 'express';
import CarrinhoController from '../controllers/CarrinhoController';
import ClienteController from '../controllers/ClienteController';
import CupomController from '../controllers/CupomController';
import FavoritoController from '../controllers/FavoritoController';
import PedidoController from '../controllers/PedidoController';
import ProdutoController from '../controllers/ProdutoController';
import passport from 'passport';

const routes = Router();

routes.post("/clientes", ClienteController.create);
routes.get("/clientes", ClienteController.readAll);
routes.get("/clientes/:id", ClienteController.read);
routes.put("/clientes/:id", ClienteController.update);
routes.delete("/user", passport.authenticate('jwt', {session:false}), ClienteController.destroy);


routes.post("/clientes/:clienteId/novoCupom", CupomController.create);
routes.get("/cupons/:id", CupomController.read);
routes.get("/clientes/:clienteId/cupons", CupomController.readAll);
routes.put("/cupons/:id", CupomController.update);
routes.delete("/cupons/:id", CupomController.destroy);


routes.post("/clientes/:clienteId/novoProduto", ProdutoController.create);
routes.get("/produtos/:id", ProdutoController.read);
routes.get("/clientes/:clienteId/produtos", ProdutoController.readAll);
routes.put("/produtos/:id", ProdutoController.update);
routes.delete("/produtos/:id", ProdutoController.destroy);


routes.post("/clientes/:clienteId/novoFavorito/:produtoId", FavoritoController.create);
routes.get("/favoritos/:id", FavoritoController.read);
routes.get("/clientes/:clienteId/favoritos", FavoritoController.readAll);
routes.delete("/favoritos/:id", FavoritoController.destroy);


routes.post("/clientes/:clienteId/novoCarrinho", CarrinhoController.create);
routes.get("/carrinho/:carrinhoId", CarrinhoController.read);
routes.put("/clientes/:clienteId/clearCarrinho", CarrinhoController.clearCarrinho);
routes.put("/carrinho/:carrinhoId/addProduto/:produtoId", CarrinhoController.addProduto);
routes.put("/carrinho/:carrinhoId/removeProduto/:produtoId", CarrinhoController.removeProduto);
routes.put("/carrinho/:carrinhoId/applyCupom/:cupomId", CarrinhoController.applyCupom);

routes.post("/pedido/:carrinhoId", PedidoController.create);
routes.get("/pedido/:pedidoId", PedidoController.read);
routes.get("/pedidos/:clienteId", PedidoController.readAll);
routes.delete("/pedido/:pedidoId", PedidoController.destroy);


export default routes;