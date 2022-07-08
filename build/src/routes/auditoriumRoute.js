"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuditoriumController_1 = require("./../controller/AuditoriumController");
const express_1 = require("express");
let router = (0, express_1.Router)();
router.get('/', AuditoriumController_1.getAllAuditorium);
router.post('/', AuditoriumController_1.RegisterAuditorium);
router.delete('/', AuditoriumController_1.deleteAuditorium);
router.patch('/:id', AuditoriumController_1.updateAuditorium);
router.get('/:id', AuditoriumController_1.getAllAuditoriumById);
exports.default = router;
//# sourceMappingURL=auditoriumRoute.js.map