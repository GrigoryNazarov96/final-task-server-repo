"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const itemController_1 = require("../controllers/itemController");
const router = express_1.default.Router();
router
    .route('/')
    .get((0, authController_1.protect)({ allowNonAuthorized: true }), itemController_1.getItems)
    .post((0, authController_1.protect)(), itemController_1.createItem)
    .delete((0, authController_1.protect)(), itemController_1.bulkDeleteItems);
router
    .route('/:id')
    .get((0, authController_1.protect)({ allowNonAuthorized: true }), itemController_1.getItem)
    .patch((0, authController_1.protect)(), itemController_1.updateItem);
exports.default = router;
//# sourceMappingURL=itemRoutes.js.map