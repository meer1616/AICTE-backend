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
exports.updateUser = exports.deleteUser = exports.getAllUser = exports.registerUser = void 0;
const ormconfig_1 = require("../../ormconfig");
const User_1 = require("../Entities/User");
const bcrypt_1 = require("bcrypt");
const Cells_1 = require("../Entities/Cells");
const Address_1 = require("../Entities/Address");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, contactNumber, email, password, imageUrl, dateOfBirth, cellType, addressLine, city, pincode, state } = req.body;
        if (!firstName ||
            !lastName ||
            !contactNumber ||
            !email ||
            !password ||
            !imageUrl ||
            !dateOfBirth ||
            !cellType ||
            !addressLine ||
            !city ||
            !pincode ||
            !state) {
            return res.status(400).json({ message: "Enter the required field" });
        }
        const duplicate = yield User_1.User.findOne({ where: { email: email } });
        if (duplicate) {
            return res
                .status(409)
                .json({ message: "Email has been already registered" });
        }
        const address = new Address_1.Address();
        address.addressLine = addressLine;
        address.city = city;
        address.pincode = pincode;
        address.state = state;
        const savedAddress = yield address.save().catch((err) => {
            res.json({ error: err.detail });
        });
        const hashPass = yield (0, bcrypt_1.hash)(password, 10);
        const user = new User_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.hashedPassword = hashPass;
        user.contactNumber = Number(contactNumber);
        user.imageUrl = imageUrl;
        user.cellType = cellType;
        user.role = [3];
        user.dateOfBirth = new Date(dateOfBirth);
        if (savedAddress) {
            user.addressId = savedAddress;
            const userCell = yield Cells_1.Cells.findOne({ where: { cellName: user.cellType } });
            console.log("userCell: " + userCell);
            if (userCell) {
                user.belongsTocell = userCell;
                const newUser = yield user.save().catch((err) => {
                    res.json({ error: err.detail });
                });
            }
            else {
                return res.status(404).json({ success: false, message: "cells Not found." });
            }
        }
        else {
            res.status(500).json({ error: "Server error" });
        }
        return res.status(201).json({ success: true, message: "User Created successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield ormconfig_1.AppDataSource.getRepository(User_1.User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.addressId", "address")
            .getMany();
        if (!allUsers)
            return res.status(204).json({ message: "No User found" });
        return res.status(200).json({ length: allUsers.length, allUsers });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllUser = getAllUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("del user id", (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id);
    try {
        if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id))
            return res.status(400).json({ message: "user id required" });
        const user = yield User_1.User.findOne({ where: { id: req.body.id } });
        if (!user)
            return res.status(204).json({ message: `no user with id ${user} found` });
        const result = yield User_1.User.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, contactNumber, email, dateOfBirth } = req.body;
        if (!id)
            return res.status(204).json({ message: `id not found` });
        if (firstName || lastName || contactNumber || email || dateOfBirth) {
            yield ormconfig_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                res.json({ error: err.detail });
            });
            return res.json({
                success: true,
                message: "user updated successfully",
            });
        }
        else {
            return res.status(400).json({ message: `body not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=UserController.js.map