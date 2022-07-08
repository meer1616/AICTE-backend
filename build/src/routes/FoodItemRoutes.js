"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FoodItemController_1 = require("../controller/FoodItemController");
let router = (0, express_1.Router)();
router.get('/', FoodItemController_1.getAllFoodItem);
router.post('/', FoodItemController_1.registerFoodItem);
router.delete('/', FoodItemController_1.deleteFoodItem);
router.patch('/:id', FoodItemController_1.updatefoodItem);
router.get('/:id', FoodItemController_1.getSingleFoodItem);
exports.default = router;
//# sourceMappingURL=FoodItemRoutes.js.map