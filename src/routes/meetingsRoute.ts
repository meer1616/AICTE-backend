import { Router } from "express"
import { createMeetings, deleteMeetings, getMeetings } from "../controller/MeetingController";
let router = Router();

router.get('/', getMeetings)
router.post('/', createMeetings)
// router.delete('/', deleteMeetings)
// router.patch('/:id', updateOrder)
// router.get('/:id', getSingleOrder)


export default router