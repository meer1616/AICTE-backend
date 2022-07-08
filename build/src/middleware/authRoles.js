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
exports.authUserRole = exports.authAdminRole = exports.authSuperAdminRole = void 0;
const Roles_1 = require("../utilitiy/Roles");
const authSuperAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log("req in authSuperrole", (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles);
    try {
        if ((_b = req.user) === null || _b === void 0 ? void 0 : _b.roles.toString().includes(Roles_1.Role.SUPERADMIN)) {
            console.log(`you can access `);
            next();
        }
        else {
            console.log(`you cannot access with email ${(_c = req.user) === null || _c === void 0 ? void 0 : _c.email}`);
            return res.status(401).json({ message: 'unauthorized user' });
        }
    }
    catch (error) {
        console.log("error in authSuperrole", error.message);
    }
});
exports.authSuperAdminRole = authSuperAdminRole;
const authAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    console.log("req in authadminrole", (_d = req.user) === null || _d === void 0 ? void 0 : _d.roles);
    try {
        if ((_e = req.user) === null || _e === void 0 ? void 0 : _e.roles.toString().includes(Roles_1.Role.ADMIN)) {
            console.log(`you can access `);
            next();
        }
        else {
            console.log(`you cannot access with email ${(_f = req.user) === null || _f === void 0 ? void 0 : _f.roles}`);
            return res.status(401).json({ message: 'unauthorized user' });
        }
    }
    catch (error) {
        console.log("error in authadminrole", error.message);
    }
});
exports.authAdminRole = authAdminRole;
const authUserRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        if ((_h = (_g = req.user) === null || _g === void 0 ? void 0 : _g.roles) === null || _h === void 0 ? void 0 : _h.toString().includes(Roles_1.Role.User)) {
            console.log(`you can access `);
            next();
        }
        else {
            console.log(`you cannot access with email ${(_j = req.user) === null || _j === void 0 ? void 0 : _j.email}`);
            return res.status(401).json({ message: 'unauthorized user' });
        }
    }
    catch (error) {
        console.log("error in authUserrole", error.message);
    }
});
exports.authUserRole = authUserRole;
//# sourceMappingURL=authRoles.js.map