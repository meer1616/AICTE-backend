import { Router } from "express"
import { Refresh } from "../../controller/authController/refreshToken"
const router = Router()

router.post('/', Refresh)

export default router