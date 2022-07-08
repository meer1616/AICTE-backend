"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeetings = exports.createMeetings = exports.getMeetings = void 0;
const Meetings_1 = require("./../Entities/Meetings");
const ormconfig_1 = require("../../ormconfig");
const User_1 = require("../Entities/User");
const getMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getMeetings = yield ormconfig_1.AppDataSource
            .getRepository(Meetings_1.Meeting)
            .createQueryBuilder("meeting")
            .leftJoinAndSelect("meeting.attendees", "attendees")
            .getMany();
        console.log("by left join", getMeetings);
        const getallMeetings = yield Meetings_1.Meeting.find();
        console.log("getallMeetings", getallMeetings);
        if (!getallMeetings)
            return res.status(204).json({ message: "No FoodItem found" });
        return res.status(200).json({ length: getMeetings.length, getMeetings });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getMeetings = getMeetings;
const createMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { zoomUrl } = req.body;
        console.log("zoom url", zoomUrl);
        const createnewMeetings = new Meetings_1.Meeting();
        createnewMeetings.zoomUrl = zoomUrl;
        const userToAttainMeeting = yield User_1.User.findOne({ where: { id: req.userId } });
        console.log("userToAttainMeeting", userToAttainMeeting);
        if (userToAttainMeeting) {
            createnewMeetings.attendees = [userToAttainMeeting];
        }
        const newMeeting = yield createnewMeetings.save().catch((err) => {
            res.json({ success: false, error: err });
        });
        return res.status(201).json({ success: true, message: "attendes added successfully", newMeeting });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createMeetings = createMeetings;
const deleteMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteMeetings = deleteMeetings;
//# sourceMappingURL=MeetingController.js.map