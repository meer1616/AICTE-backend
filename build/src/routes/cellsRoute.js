"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CellsController_1 = require("./../controller/CellsController");
const express_1 = require("express");
const authRoles_1 = require("../middleware/authRoles");
let router = (0, express_1.Router)();
router.get('/', authRoles_1.authUserRole, CellsController_1.getAllCells);
router.get('/', authRoles_1.authAdminRole, CellsController_1.getAllCells);
router.get('/', authRoles_1.authSuperAdminRole, CellsController_1.getAllCells);
router.post('/', authRoles_1.authSuperAdminRole, CellsController_1.RegisterCells);
router.delete('/', CellsController_1.deleteCell);
router.patch('/:id', authRoles_1.authSuperAdminRole, CellsController_1.updateCell);
router.get('/:id', authRoles_1.authUserRole, CellsController_1.getCellById);
router.get('/:id', authRoles_1.authAdminRole, CellsController_1.getCellById);
router.get('/:id', authRoles_1.authSuperAdminRole, CellsController_1.getCellById);
exports.default = router;
//# sourceMappingURL=cellsRoute.js.map