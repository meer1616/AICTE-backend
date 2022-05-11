import { Router } from "express"
import { logoutController } from "../../controller/authController/LogoutController"
const router = Router()

router.get('/', logoutController)

export default router