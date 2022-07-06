import { verifyJWT } from './../middleware/verifyAuth';
import { deleteCell, getAllCells, RegisterCells, updateCell, getCellById } from './../controller/CellsController';
import { Router } from "express"
import { authRole } from "../middleware/authRoles"
// import verifyJWT

let router = Router();

router.get('/', authRole, getAllCells)
router.post('/', authRole, RegisterCells)
router.delete('/', deleteCell)
router.patch('/:id', updateCell)
router.get('/:id', getCellById)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router