"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controller/OrderController");
let router = (0, express_1.Router)();
router.get('/', OrderController_1.getAllOrders);
router.post('/', OrderController_1.registerOrder);
router.delete('/', OrderController_1.deleteOrder);
router.patch('/:id', OrderController_1.updateOrder);
router.get('/:id', OrderController_1.getSingleOrder);
exports.default = router;
//# sourceMappingURL=orderRoute.js.map