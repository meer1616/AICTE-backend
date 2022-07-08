"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestaurantController_1 = require("./../controller/RestaurantController");
const express_1 = require("express");
let router = (0, express_1.Router)();
router.get('/', RestaurantController_1.getAllRestaurant);
router.post('/', RestaurantController_1.registerRestaurant);
router.delete('/', RestaurantController_1.deleteRestaurant);
router.patch('/:id', RestaurantController_1.updateRestaurant);
router.get('/:id', RestaurantController_1.getSingleRestaurant);
exports.default = router;
//# sourceMappingURL=restaurantRoute.js.map