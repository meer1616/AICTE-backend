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
exports.getSingleFoodItem = exports.updatefoodItem = exports.deleteFoodItem = exports.getAllFoodItem = exports.registerFoodItem = void 0;
const ormconfig_1 = require("../../ormconfig");
const FoodItem_1 = require("../Entities/FoodItem");
const registerFoodItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, type, ingredients, price, imageUrl, } = req.body;
        console.log(req.body);
        if (!name || !description || !type || !ingredients || !imageUrl || !price)
            return res.status(400).json({ message: "Enter the required field" });
        const duplicateCell = yield FoodItem_1.FoodItems.findOne({ where: { name } });
        if (duplicateCell)
            return res.status(409).json({ message: "Food Item has been already registered " });
        const restaurant = new FoodItem_1.FoodItems();
        restaurant.name = name;
        restaurant.description = description;
        restaurant.imageUrl = imageUrl;
        restaurant.type = type;
        restaurant.ingredients = ingredients;
        restaurant.price = price;
        const newFood = yield restaurant.save().catch((err) => {
            res.json({ error: err });
        });
        return res.status(201).json({ success: true, newFood });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.registerFoodItem = registerFoodItem;
const getAllFoodItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield FoodItem_1.FoodItems.find();
        if (!food)
            return res.status(204).json({ message: "No FoodItem found" });
        return res.status(200).json({ length: food.length, food });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllFoodItem = getAllFoodItem;
const deleteFoodItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
            return res.status(400).json({ message: "FoodItem id required" });
        const food = yield FoodItem_1.FoodItems.findOne({ where: { id: req.body.id } });
        if (!food)
            return res.status(204).json({ message: `no Restaurant with id ${food} found` });
        const result = yield FoodItem_1.FoodItems.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteFoodItem = deleteFoodItem;
const updatefoodItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, type, ingredients, price, imageUrl, } = req.body;
        if (!id)
            return res.status(204).json({ message: `id not found` });
        const restaurantId = yield FoodItem_1.FoodItems.findOne({ where: { id } });
        if (!restaurantId)
            return res.json({ message: `no food item with id ${id} found` }).status(204);
        if (name || description || type || ingredients || price || imageUrl) {
            yield ormconfig_1.AppDataSource.createQueryBuilder()
                .update(FoodItem_1.FoodItems)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                res.json({ error: err.detail });
            });
            return res.json({
                success: true,
                message: "FoodItem updated successfully",
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
exports.updatefoodItem = updatefoodItem;
const getSingleFoodItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.params) === null || _b === void 0 ? void 0 : _b.id))
            return res.status(400).json({ message: "FoodItem id required" });
        const food = yield FoodItem_1.FoodItems.findOne({ where: { id: req.params.id } });
        if (!food)
            return res.status(204).json({ message: `no cell with id ${food} found` });
        return res.status(200).json({ message: "getById successfully ", food });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getSingleFoodItem = getSingleFoodItem;
//# sourceMappingURL=FoodItemController.js.map