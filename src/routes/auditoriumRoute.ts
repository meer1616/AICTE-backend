import { getAllAuditorium, RegisterAuditorium, deleteAuditorium, getAllAuditoriumById, updateAuditorium } from './../controller/AuditoriumController';
import { Router } from "express"
let router = Router();

router.get('/', getAllAuditorium)
router.post('/', RegisterAuditorium)
router.delete('/', deleteAuditorium)
router.patch('/:id', updateAuditorium)
router.get('/:id', getAllAuditoriumById)

// router.post('/', registerUser)
// router.delete('/', deleteUser)
// router.patch('/:id', updateUser)

export default router