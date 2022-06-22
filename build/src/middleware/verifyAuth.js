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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../Entities/User");
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).json({ messsage: "Unauthorized" });
        const data = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || '');
        const user = yield User_1.User.findOne({
            where: { email: data.email }
        });
        if (!user)
            return res.status(401).json({ message: "Unauthorized User" });
        req.email = user.email;
        return next();
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verifyAuth.js.map