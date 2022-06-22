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
exports.getAllAuditoriumById = exports.updateAuditorium = exports.deleteAuditorium = exports.RegisterAuditorium = exports.getAllAuditorium = void 0;
const ormconfig_1 = require("../../ormconfig");
const Auditorium_1 = require("../Entities/Auditorium");
const getAllAuditorium = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAuditorium = yield Auditorium_1.Auditorium.find();
        if (!allAuditorium)
            return res.status(204).json({ message: "No Cell found" });
        return res.status(200).json({ length: allAuditorium.length, allAuditorium });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllAuditorium = getAllAuditorium;
const RegisterAuditorium = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ManagerName, email, contactNumber, imageUrl, addressLine, city, pincode, state, capacity, availability, fromDate, toDate, facilities } = req.body;
        console.log(req.body);
        if (!name || !ManagerName || !email || !contactNumber || !imageUrl || !addressLine || !city || !pincode || !state || !capacity || !availability || !fromDate || !toDate || !facilities)
            return res.status(400).json({ message: "Enter the required field" });
        const duplicateCell = yield Auditorium_1.Auditorium.findOne({ where: { email } });
        if (duplicateCell)
            return res.status(409).json({ message: "Auditorium has been already registered " });
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const auditorium = new Auditorium_1.Auditorium();
        auditorium.name = name;
        auditorium.ManagerName = ManagerName;
        auditorium.email = email;
        auditorium.contactNumber = contactNumber;
        auditorium.imageUrl = imageUrl;
        auditorium.addressLine = addressLine;
        auditorium.city = city;
        auditorium.pincode = pincode;
        auditorium.state = state;
        auditorium.capacity = capacity;
        auditorium.availability = availability;
        auditorium.capacity = capacity;
        auditorium.fromDate = fromDate;
        auditorium.toDate = toDate;
        auditorium.facilities = facilities;
        auditorium.createdAt = `${date} ${time}`;
        const newAuditorium = yield auditorium.save().catch((err) => {
            res.json({ error: err });
        });
        return res.status(201).json({ success: true, newAuditorium });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.RegisterAuditorium = RegisterAuditorium;
const deleteAuditorium = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
            return res.status(400).json({ message: "Auditorium id required" });
        const cell = yield Auditorium_1.Auditorium.findOne({ where: { id: req.body.id } });
        if (!cell)
            return res.status(204).json({ message: `no Auditorium with id ${cell} found` });
        const result = yield Auditorium_1.Auditorium.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteAuditorium = deleteAuditorium;
const updateAuditorium = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, ManagerName, email, contactNumber, imageUrl, addressLine, city, pincode, state, capacity, availability, fromDate, toDate, facilities } = req.body;
        if (!id)
            return res.status(204).json({ message: `id not found` });
        const cellId = yield Auditorium_1.Auditorium.findOne({ where: { id } });
        if (!cellId)
            return res.json({ message: `no cell with id ${Number(id)} found` }).status(204);
        if (name || ManagerName || email || contactNumber || imageUrl || addressLine || city || pincode || state || capacity || availability || fromDate || toDate || facilities) {
            yield ormconfig_1.AppDataSource.createQueryBuilder()
                .update(Auditorium_1.Auditorium)
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
exports.updateAuditorium = updateAuditorium;
const getAllAuditoriumById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.params) === null || _b === void 0 ? void 0 : _b.id))
            return res.status(400).json({ message: "cell id required" });
        const auditorium = yield Auditorium_1.Auditorium.findOne({ where: { id: req.params.id } });
        if (!auditorium)
            return res.status(204).json({ message: `no auditorium with id ${auditorium} found` });
        return res.status(200).json({ success: true, auditorium });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllAuditoriumById = getAllAuditoriumById;
//# sourceMappingURL=AuditoriumController.js.map