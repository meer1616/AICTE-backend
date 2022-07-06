import { Router } from "express"
import { getTokenForResetPassword, resetPassword } from "../controller/ResetPassController"
let router = Router();


router.post('/:id/:token', resetPassword)
router.get('/:id/:token', getTokenForResetPassword)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router