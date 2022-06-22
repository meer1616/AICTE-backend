"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CellsController_1 = require("./../controller/CellsController");
const express_1 = require("express");
let router = express_1.Router();
router.get('/', CellsController_1.getAllCells);
router.post('/', CellsController_1.RegisterCells);
router.delete('/', CellsController_1.deleteCell);
router.patch('/:id', CellsController_1.updateCell);
router.get('/:id', CellsController_1.getCellById);
exports.default = router;
//# sourceMappingURL=cellsRoute.js.map