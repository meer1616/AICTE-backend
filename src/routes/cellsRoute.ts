import { verifyJWT } from './../middleware/verifyAuth';
import { deleteCell, getAllCells, RegisterCells, updateCell, getCellById } from './../controller/CellsController';
import { Router } from "express"
import { authAdminRole, authSuperAdminRole, authUserRole } from "../middleware/authRoles"
// import verifyJWT

let router = Router();

// router.get('/', getAllCells)
router.get('/', authUserRole, getAllCells)
router.get('/', authAdminRole, getAllCells)
router.get('/', authSuperAdminRole, getAllCells)
router.post('/', authSuperAdminRole, RegisterCells)
// router.delete('/', authSuperAdminRole, deleteCell)
router.delete('/', deleteCell)
router.patch('/:id', authSuperAdminRole, updateCell)
router.get('/:id', authUserRole, getCellById)
router.get('/:id', authAdminRole, getCellById)
router.get('/:id', authSuperAdminRole, getCellById)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router