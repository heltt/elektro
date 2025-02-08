import { Router } from 'express';
import CarrinhoController from '../controllers/CarrinhoController';
import ClienteController from '../controllers/ClienteController';
import CupomController from '../controllers/CupomController';
import FavoritoController from '../controllers/FavoritoController';
import PedidoController from '../controllers/PedidoController';
import ProdutoController from '../controllers/ProdutoController';

const router = Router();

router.post("/clientes", ClienteController.create);
router.get("/clientes", ClienteController.readAll);
router.get("/clientes/:id", ClienteController.read);
router.put("/clientes/:id", ClienteController.update);
router.delete("/clientes/:id", ClienteController.destroy);


router.post("/clientes/:clienteId/novoCupom", CupomController.create);
router.get("/cupons/:id", CupomController.read);
router.get("/clientes/:clienteId/cupons", CupomController.readAll);
router.put("/cupons/:id", CupomController.update);
router.delete("/cupons/:id", CupomController.destroy);


router.post("/clientes/:clienteId/novoProduto", ProdutoController.create);
router.get("/produtos/:id", ProdutoController.read);
router.get("/clientes/:clienteId/produtos", ProdutoController.readAll);
router.put("/produtos/:id", ProdutoController.update);
router.delete("/produtos/:id", ProdutoController.destroy);


router.post("/clientes/:clienteId/novoFavorito/:produtoId", FavoritoController.create);
router.get("/favoritos/:id", FavoritoController.read);
router.get("/clientes/:clienteId/favoritos", FavoritoController.readAll);
router.delete("/favoritos/:id", FavoritoController.destroy);


router.post("/clientes/:clienteId/novoCarrinho", CarrinhoController.create);
router.get("/carrinho/:carrinhoId", CarrinhoController.read);
router.put("/clientes/:clienteId/clearCarrinho", CarrinhoController.clearCarrinho);
router.put("/carrinho/:carrinhoId/addProduto/:produtoId", CarrinhoController.addProduto);
router.put("/carrinho/:carrinhoId/removeProduto/:produtoId", CarrinhoController.removeProduto);
router.put("/carrinho/:carrinhoId/applyCupom/:cupomId", CarrinhoController.applyCupom);

router.post("/pedido/:carrinhoId", PedidoController.create);
router.get("/pedido/:pedidoId", PedidoController.read);
router.get("/pedidos/:clienteId", PedidoController.readAll);
router.delete("/pedido/:pedidoId", PedidoController.destroy);


export default router;