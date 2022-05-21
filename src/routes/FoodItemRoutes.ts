import { Router } from "express"
import { getAllFoodItem, deleteFoodItem, getSingleFoodItem, registerFoodItem, updatefoodItem } from "../controller/FoodItemController";
let router = Router();

router.get('/', getAllFoodItem)
router.post('/', registerFoodItem)
router.delete('/', deleteFoodItem)
router.patch('/:id', updatefoodItem)
router.get('/:id', getSingleFoodItem)


export default router