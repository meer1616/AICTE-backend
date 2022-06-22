"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
let router = express_1.Router();
router.get('/', UserController_1.getAllUser);
router.post('/', UserController_1.registerUser);
router.delete('/', UserController_1.deleteUser);
router.patch('/:id', UserController_1.updateUser);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map