import { Router } from "express"
import { deleteUser, getAllUser, registerUser, updateUser } from "../controller/UserController"
let router = Router();

router.get('/', getAllUser)

router.post('/', registerUser)
router.delete('/', deleteUser)
router.patch('/:id', updateUser)

export default router