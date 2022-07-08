"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ResetPassController_1 = require("../controller/ResetPassController");
let router = (0, express_1.Router)();
router.post('/:id/:token', ResetPassController_1.resetPassword);
router.get('/:id/:token', ResetPassController_1.getTokenForResetPassword);
exports.default = router;
//# sourceMappingURL=resetPasswordRoute.js.map