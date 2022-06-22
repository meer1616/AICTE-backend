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
exports.getSingleRestaurant = exports.updateRestaurant = exports.deleteRestaurant = exports.getAllRestaurant = exports.registerRestaurant = void 0;
const ormconfig_1 = require("../../ormconfig");
const Restaurant_1 = require("../Entities/Restaurant");
const registerRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, email, restType, contactNumber, imageUrl, addressLine, city, pincode, state } = req.body;
        console.log(req.body);
        if (!name || !email || !description || !restType || !contactNumber || !imageUrl || !addressLine || !city || !pincode || !state)
            return res.status(400).json({ message: "Enter the required field" });
        const duplicateCell = yield Restaurant_1.Restaurant.findOne({ where: { email } });
        if (duplicateCell)
            return res.status(409).json({ message: "Cell has been already registered " });
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const restaurant = new Restaurant_1.Restaurant();
        restaurant.name = name;
        restaurant.description = description;
        restaurant.email = email;
        restaurant.contactNumber = contactNumber;
        restaurant.imageUrl = imageUrl;
        restaurant.restType = restType;
        restaurant.addressLine = addressLine;
        restaurant.city = city;
        restaurant.pincode = pincode;
        restaurant.state = state;
        restaurant.createdAt = `${date} ${time}`;
        const newRestaurant = yield restaurant.save().catch((err) => {
            res.json({ error: err });
        });
        return res.status(201).json({ success: true, newRestaurant });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.registerRestaurant = registerRestaurant;
const getAllRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_1.Restaurant.find();
        if (!restaurant)
            return res.status(204).json({ message: "No Restaurant found" });
        return res.status(200).json({ length: restaurant.length, restaurant });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllRestaurant = getAllRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
            return res.status(400).json({ message: "Restaurant id required" });
        const cell = yield Restaurant_1.Restaurant.findOne({ where: { id: req.body.id } });
        if (!cell)
            return res.status(204).json({ message: `no Restaurant with id ${cell} found` });
        const result = yield Restaurant_1.Restaurant.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteRestaurant = deleteRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, email, restType, contactNumber, imageUrl, addressLine, city, pincode, state } = req.body;
        if (!id)
            return res.status(204).json({ message: `id not found` });
        const restaurantId = yield Restaurant_1.Restaurant.findOne({ where: { id } });
        if (!restaurantId)
            return res.json({ message: `no cell with id ${id} found` }).status(204);
        if (name || description || email || restType || contactNumber || imageUrl || addressLine || city || pincode || state) {
            yield ormconfig_1.AppDataSource.createQueryBuilder()
                .update(Restaurant_1.Restaurant)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                res.json({ error: err.detail });
            });
            return res.json({
                success: true,
                message: "Restaurant updated successfully",
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
exports.updateRestaurant = updateRestaurant;
const getSingleRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.params) === null || _b === void 0 ? void 0 : _b.id))
            return res.status(400).json({ message: "cell id required" });
        const restaurant = yield Restaurant_1.Restaurant.findOne({ where: { id: req.params.id } });
        if (!restaurant)
            return res.status(204).json({ message: `no cell with id ${restaurant} found` });
        return res.status(200).json({ message: "getById successfully ", restaurant });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getSingleRestaurant = getSingleRestaurant;
//# sourceMappingURL=RestaurantController.js.map