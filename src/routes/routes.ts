import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';
import PedidoController from '../controllers/PedidoController';
import ProdutoController from '../controllers/ProdutoController';
import PedidoProdutoController from '../controllers/PedidoProdutoController';

const router = Router();

// Rotas para Cliente
router.post('/clientes', ClienteController.create);
router.get('/clientes', ClienteController.readAll);
router.get('/clientes/:id', ClienteController.read);
router.put('/clientes/:id', ClienteController.update);
router.delete('/clientes/:id', ClienteController.destroy);

// Rotas para Pedido
router.post('/pedidos', PedidoController.create);
router.get('/pedidos', PedidoController.readAll);
router.get('/pedidos/:id', PedidoController.read);
router.put('/pedidos/:id', PedidoController.update);
router.delete('/pedidos/:id', PedidoController.destroy);

// Rotas para Produto
router.post('/produtos', ProdutoController.create);
router.get('/produtos', ProdutoController.readAll);
router.get('/produtos/:id', ProdutoController.read);
router.put('/produtos/:id', ProdutoController.update);
router.delete('/produtos/:id', ProdutoController.destroy);

// Rotas para PedidoProduto (relação Pedido <-> Produto)
router.post('/pedido-produto', PedidoProdutoController.adicionarProdutoAoPedido);
router.get('/pedido-produto/:pedidoId', PedidoProdutoController.listarProdutosDoPedido);
router.delete('/pedido-produto/:id', PedidoProdutoController.removerProdutoDoPedido);

export default router;