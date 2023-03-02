"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const collectionController_1 = require("../controllers/collectionController");
const router = (0, express_1.Router)();
router.get('/', (0, authController_1.protect)(), collectionController_1.getFeatured);
exports.default = router;
//# sourceMappingURL=featuredRoute.js.map