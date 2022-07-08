"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ForgetPasswordController_1 = require("../controller/ForgetPasswordController");
let router = (0, express_1.Router)();
router.post('/', ForgetPasswordController_1.getUserEmail);
exports.default = router;
//# sourceMappingURL=forgetPasswordRoute.js.map