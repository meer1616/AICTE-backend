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
exports.updateCell = exports.getCellById = exports.deleteCell = exports.RegisterCells = exports.getAllCells = void 0;
const Cells_1 = require("./../Entities/Cells");
const ormconfig_1 = require("../../ormconfig");
const getAllCells = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCells = yield ormconfig_1.AppDataSource.getRepository(Cells_1.Cells)
            .createQueryBuilder("cells")
            .leftJoinAndSelect("cells.employees", "employees")
            .getMany();
        if (!allCells)
            return res.status(204).json({ message: "No Cell found" });
        return res.status(200).json({ length: allCells.length, allCells });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllCells = getAllCells;
const RegisterCells = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cellName, cellEmail, cellCode, contactNumber, imageUrl, ManagerId, addressLine, city, pincode, state, employees } = req.body;
        console.log({ cellName, cellEmail, cellCode, contactNumber, imageUrl, ManagerId, addressLine, city, pincode, state, employees });
        if (!cellName || !cellEmail || !cellCode || !contactNumber || !imageUrl || !ManagerId || !addressLine || !city || !pincode || !state || !employees)
            return res.status(400).json({ message: "Enter the required field" });
        const duplicateCell = yield Cells_1.Cells.findOne({ where: { cellEmail } });
        if (duplicateCell)
            return res.status(409).json({ message: "Cell has been already registered " });
        const cell = new Cells_1.Cells();
        cell.cellName = cellName;
        cell.cellEmail = cellEmail;
        cell.cellCode = cellCode;
        cell.contactNumber = contactNumber;
        cell.imageUrl = imageUrl;
        cell.ManagerId = ManagerId;
        cell.employees = employees;
        const newCell = yield cell.save().catch((err) => {
            res.json({ error: err });
        });
        return res.status(201).json({ success: true, newCell });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.RegisterCells = RegisterCells;
const deleteCell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
            return res.status(400).json({ message: "user id required" });
        const cell = yield Cells_1.Cells.findOne({ where: { id: req.body.id } });
        if (!cell)
            return res.status(204).json({ message: `no cell with id ${cell} found` });
        const result = yield Cells_1.Cells.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteCell = deleteCell;
const getCellById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.params) === null || _b === void 0 ? void 0 : _b.id))
            return res.status(400).json({ message: "cell id required" });
        const cell = yield Cells_1.Cells.findOne({ where: { id: req.params.id } });
        if (!cell)
            return res.status(204).json({ message: `no cell with id ${cell} found` });
        return res.status(200).json({ message: "getById successfully ", cell });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getCellById = getCellById;
const updateCell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { cellName, cellEmail, cellCode, contactNumber, imageUrl, ManagerId, addressLine, city, pincode, state, employees } = req.body;
        if (!id)
            return res.status(204).json({ message: `id not found` });
        const cellId = yield Cells_1.Cells.findOne({ where: { id: id } });
        if (!cellId)
            return res.json({ message: `no cell with id ${id} found` }).status(204);
        if (cellName || cellEmail || cellCode || contactNumber || imageUrl || ManagerId || addressLine || city || pincode || state || employees) {
            yield ormconfig_1.AppDataSource.createQueryBuilder()
                .update(Cells_1.Cells)
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
exports.updateCell = updateCell;
//# sourceMappingURL=CellsController.js.map