import { Meeting } from './../Entities/Meetings';
import { AuthRequest } from "../types/AuthRequest"
import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { User } from '../Entities/User';

export const getMeetings = async (req: Request, res: Response) => {

    try {
        const getMeetings = await AppDataSource
            .getRepository(Meeting)
            .createQueryBuilder("meeting")
            .leftJoinAndSelect("meeting.attendees", "attendees")
            .getMany()

        console.log("by left join", getMeetings);

        const getallMeetings = await Meeting.find()
        console.log("getallMeetings", getallMeetings);

        if (!getallMeetings) return res.status(204).json({ message: "No FoodItem found" });
        return res.status(200).json({ length: getMeetings.length, getMeetings });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const createMeetings = async (req: AuthRequest, res: Response) => {

    try {
        const { zoomUrl } = req.body;
        console.log("zoom url", zoomUrl);
        const createnewMeetings = new Meeting()
        createnewMeetings.zoomUrl = zoomUrl
        const userToAttainMeeting = await User.findOne({ where: { id: req.userId } });

        if (userToAttainMeeting) {
            createnewMeetings.attendees = [userToAttainMeeting]
            return res.json({ success: true, message: "successfully insertes attendees" })
        }

        const newMeeting = await createnewMeetings.save().catch((err) => {
            res.json({ success: false, error: err })
        })
        return res.status(201).json({ success: true, newMeeting });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const deleteMeetings = async (req: AuthRequest, res: Response) => {


}