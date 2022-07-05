import { Router } from "express"
import { logoutController } from "../../controller/authController/LogoutController"
const router = Router()

router.post('/', logoutController)

export default router