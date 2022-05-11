import { Router } from "express"
import { Refresh } from "../../controller/authController/refreshToken"
const router = Router()

router.get('/', Refresh)

export default router