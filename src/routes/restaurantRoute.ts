import { registerRestaurant, deleteRestaurant, getAllRestaurant, getSingleRestaurant, updateRestaurant } from './../controller/RestaurantController';
import { Router } from "express"
let router = Router();

router.get('/', getAllRestaurant)
router.post('/', registerRestaurant)
router.delete('/', deleteRestaurant)
router.patch('/:id', updateRestaurant)
router.get('/:id', getSingleRestaurant)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router