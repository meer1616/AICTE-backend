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
    const cookie = req.cookies;
    if (!(cookie === null || cookie === void 0 ? void 0 : cookie.jwt))
        return res.sendStatus(204);
    const refreshToken = cookie.jwt;
    const foundUser = yield User_1.User.findOne({ where: { refreshToken } });
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });
        return res.sendStatus(204);
    }
    foundUser.refreshToken = "";
    const result = yield foundUser.save();
    console.log(result);
    res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
});
exports.logoutController = logoutController;
//# sourceMappingURL=LogoutController.js.map