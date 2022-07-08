"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refreshToken_1 = require("../../controller/authController/refreshToken");
const router = (0, express_1.Router)();
router.post('/', refreshToken_1.Refresh);
exports.default = router;
//# sourceMappingURL=RefreshTokenRoute.js.map