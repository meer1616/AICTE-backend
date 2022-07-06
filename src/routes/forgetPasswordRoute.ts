import { Router } from "express"
import { getUserEmail } from "../controller/ForgetPasswordController";
let router = Router();

router.post('/', getUserEmail)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router