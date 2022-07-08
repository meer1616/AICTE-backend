"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LogoutController_1 = require("../../controller/authController/LogoutController");
const router = (0, express_1.Router)();
router.post('/', LogoutController_1.logoutController);
exports.default = router;
//# sourceMappingURL=LogoutRoute.js.map