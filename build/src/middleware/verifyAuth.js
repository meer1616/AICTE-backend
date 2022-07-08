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
        console.log("req header", req.headers);
        console.log("req header auth", req.headers["authorization"]);
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).json({ messsage: "Unauthorized" });
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(data, "userrrrr");
            if (data) {
                console.log("data in verify auth", data);
                const verifyUser = yield User_1.User.findOne({
                    where: { id: data.userId },
                });
                console.log(verifyUser, "verifyUser");
                if (!verifyUser)
                    return res.status(401).json({ message: "Unauthorized User" });
                req.user = data.user;
                req.userId = data.userId;
                next();
            }
            else if ((err === null || err === void 0 ? void 0 : err.message) === "jwt expired") {
                return res.json({
                    statuscode: 190,
                    success: false,
                    message: err.message,
                });
            }
            else {
                return res
                    .status(403)
                    .json({ success: false, message: "user not authenticated" });
            }
        }));
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verifyAuth.js.map