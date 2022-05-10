import { Router } from "express"
import { LoginRoute } from "../../controller/authController/LoginController"
const router = Router()

router.post('/', LoginRoute)

export default router