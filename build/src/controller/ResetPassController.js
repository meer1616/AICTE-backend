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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenForResetPassword = exports.resetPassword = void 0;
const User_1 = require("../Entities/User");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const ormconfig_1 = require("../../ormconfig");
dotenv_1.default.config();
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    console.log("resetPassword", { id, token });
    const userWithEmail = yield User_1.User.findOne({ where: { id } });
    if ((userWithEmail === null || userWithEmail === void 0 ? void 0 : userWithEmail.id) !== id) {
        res.status(404).json({ message: `user with ${id} not found` });
    }
    const secret = `${process.env.ACCESS_TOKEN_SECRET}${userWithEmail === null || userWithEmail === void 0 ? void 0 : userWithEmail.hashedPassword}`;
    try {
        if (password !== confirmPassword) {
            return res.json({ message: "password does not match" });
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        console.log("payload in reset password", payload);
        const hashPass = yield (0, bcrypt_1.hash)(password, 10);
        yield ormconfig_1.AppDataSource
            .createQueryBuilder()
            .update(User_1.User)
            .set({ hashedPassword: hashPass })
            .where("id = :id", { id })
            .execute();
        return res.json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.resetPassword = resetPassword;
const getTokenForResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.params;
    console.log("get token for reset password", { id, token });
    const userWithEmail = yield User_1.User.findOne({ where: { id } });
    console.log("uer with email", userWithEmail);
    if ((userWithEmail === null || userWithEmail === void 0 ? void 0 : userWithEmail.id) !== id) {
        res.status(404).json({ message: `user with ${id} not found` });
    }
    const secret = `${process.env.ACCESS_TOKEN_SECRET}${userWithEmail === null || userWithEmail === void 0 ? void 0 : userWithEmail.hashedPassword}`;
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        console.log("payload", payload);
        res.json({ success: true, message: "token verified", data: payload });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getTokenForResetPassword = getTokenForResetPassword;
//# sourceMappingURL=ResetPassController.js.map