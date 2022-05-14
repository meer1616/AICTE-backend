import { deleteCell, getAllCells, RegisterCells, updateCell, getCellById } from './../controller/CellsController';
import { Router } from "express"
let router = Router();

router.get('/', getAllCells)
router.post('/', RegisterCells)
router.delete('/', deleteCell)
router.patch('/:id', updateCell)
router.get('/:id', getCellById)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router