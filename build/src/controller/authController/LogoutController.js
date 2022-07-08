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
exports.logoutController = void 0;
const User_1 = require("./../../Entities/User");
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hit logout");
    const { refreshToken } = req.body;
    const foundUser = yield User_1.User.findOne({ where: { refreshToken } });
    if (!foundUser) {
        return res.status(404).json({ success: true, message: "user not found" });
    }
    foundUser.refreshToken = "";
    const result = yield foundUser.save();
    console.log("logout res", result);
    res.status(200).json({ success: true, message: `user is successfully logout ` });
});
exports.logoutController = logoutController;
//# sourceMappingURL=LogoutController.js.map