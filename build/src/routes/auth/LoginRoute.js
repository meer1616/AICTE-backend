"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../../controller/authController/LoginController");
const router = (0, express_1.Router)();
router.post('/', LoginController_1.LoginRoute);
exports.default = router;
//# sourceMappingURL=LoginRoute.js.map