import { Router } from "express"
import { getAllOrders, deleteOrder, getSingleOrder, registerOrder, updateOrder } from "../controller/OrderController";
let router = Router();

router.get('/', getAllOrders)
router.post('/', registerOrder)
router.delete('/', deleteOrder)
router.patch('/:id', updateOrder)
router.get('/:id', getSingleOrder)


export default router