import { Router } from 'express';
//import CarrinhoController from '../controllers/CarrinhoController';
import ClienteController from '../controllers/ClienteController';
import CupomController from '../controllers/CupomController';
import FavoritoController from '../controllers/FavoritoController';
//import PedidoController from '../controllers/PedidoController';
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

export default router;