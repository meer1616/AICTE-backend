"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MeetingController_1 = require("../controller/MeetingController");
let router = (0, express_1.Router)();
router.get('/', MeetingController_1.getMeetings);
router.post('/', MeetingController_1.createMeetings);
exports.default = router;
//# sourceMappingURL=meetingsRoute.js.map