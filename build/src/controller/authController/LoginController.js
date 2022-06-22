"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LoginRoute = void 0;
const User_1 = require("./../../Entities/User");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const LoginRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password)
        return res.status(400).json({ message: "Username and Password are required." });
    const foundUser = yield User_1.User.findOne({ where: { email: email } });
    if (!foundUser)
        return res.status(401).json({ message: "Unauthorized user" });
    const match = yield bcrypt_1.compare(password, foundUser.hashedPassword);
    if (match) {
        const accessToken = jsonwebtoken_1.default.sign({
            "email": foundUser.email
        }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '5m' });
        const refreshToken = jsonwebtoken_1.default.sign({
            "email": foundUser.email
        }, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: '1hr' });
        foundUser.refreshToken = refreshToken;
        const result = yield foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
        console.log(result);
        return res.json({ data: result, accessToken });
    }
    else {
        return res.status(401).json({ message: "you are unauthorized" });
    }
});
exports.LoginRoute = LoginRoute;
//# sourceMappingURL=LoginController.js.map