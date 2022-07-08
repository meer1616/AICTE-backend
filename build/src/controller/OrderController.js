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
exports.getSingleOrder = exports.updateOrder = exports.deleteOrder = exports.getAllOrders = exports.registerOrder = void 0;
const ormconfig_1 = require("../../ormconfig");
const Order_1 = require("../Entities/Order");
const registerOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodItems, description, orderedBy, orderNo, type, totalAmount, address } = req.body;
        console.log(req.body);
        if (!foodItems || !description || !type || !orderedBy || !orderNo || !totalAmount || !address)
            return res.status(400).json({ message: "Enter the required field" });
        const duplicateCell = yield Order_1.Order.findOne({ where: { orderNo } });
        if (duplicateCell)
            return res.status(409).json({ message: "Food Item has been already ordered " });
        const restaurant = new Order_1.Order();
        restaurant.foodItems = foodItems;
        restaurant.description = description;
        restaurant.type = type;
        restaurant.orderedBy = orderedBy;
        restaurant.orderNo = orderNo;
        restaurant.totalAmount = totalAmount;
        restaurant.address = address;
        const newFood = yield restaurant.save().catch((err) => {
            res.json({ error: err });
        });
        return res.status(201).json({ success: true, newFood });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.registerOrder = registerOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield Order_1.Order.find();
        if (!food)
            return res.status(204).json({ message: "No FoodItem found" });
        return res.status(200).json({ length: food.length, food });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
            return res.status(400).json({ message: "order id required" });
        const food = yield Order_1.Order.findOne({ where: { id: req.body.id } });
        if (!food)
            return res.status(204).json({ message: `no order with id ${food} found` });
        const result = yield Order_1.Order.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteOrder = deleteOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { foodItems, description, orderedBy, orderNo, type, totalAmount, address } = req.body;
        if (!id)
            return res.status(204).json({ message: `id not found` });
        const restaurantId = yield Order_1.Order.findOne({ where: { id } });
        if (!restaurantId)
            return res.json({ message: `no food item with id ${id} found` }).status(204);
        if (foodItems || description || type || orderedBy || orderNo || totalAmount || address) {
            yield ormconfig_1.AppDataSource.createQueryBuilder()
                .update(Order_1.Order)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                res.json({ error: err.detail });
            });
            return res.json({
                success: true,
                message: "Order updated successfully",
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
exports.updateOrder = updateOrder;
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.params) === null || _b === void 0 ? void 0 : _b.id))
            return res.status(400).json({ message: "Order id required" });
        const food = yield Order_1.Order.findOne({ where: { id: req.params.id } });
        if (!food)
            return res.status(204).json({ message: `no Order with id ${food} found` });
        return res.status(200).json({ message: "getById successfully ", food });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getSingleOrder = getSingleOrder;
//# sourceMappingURL=OrderController.js.map