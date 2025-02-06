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
router.delete("/clientes/:id", ClienteController.delete);

export default router;