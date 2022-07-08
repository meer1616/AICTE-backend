"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.Refresh = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const User_1 = require("../../Entities/User");
dotenv.config();
const Refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.token);
    const refreshToken = req.body.token;
    const foundUser = yield User_1.User.findOne({ where: { refreshToken } });
    console.log("foundUser", foundUser);
    if (!foundUser)
        return res.send("getting 403 what to do");
    console.log("process.env.REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET);
    console.log("refreshToken", refreshToken);
    return jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', (err, decode) => {
        console.log("decode", decode);
        if (err || foundUser.email !== decode.UserInfo.useremail)
            return res.status(403).json({ err });
        const accessToken = jsonwebtoken_1.default.sign({
            "UserInfo": {
                "useremail": foundUser.email,
                "roles": foundUser.role
            }
        }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '25m' });
        return res.json({ roles: foundUser.role, accessToken });
    });
});
exports.Refresh = Refresh;
//# sourceMappingURL=refreshToken.js.map