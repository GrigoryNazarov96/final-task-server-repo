"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const collectionController_1 = require("../controllers/collectionController");
const router = express_1.default.Router();
router.route('/').get(collectionController_1.getCollections).post((0, authController_1.protect)(), collectionController_1.createCollection);
router
    .route('/:id')
    .get((0, authController_1.protect)({ allowNonAuthorized: true }), collectionController_1.getCollection)
    .patch((0, authController_1.protect)(), collectionController_1.updateCollection)
    .delete((0, authController_1.protect)(), collectionController_1.deleteCollection);
exports.default = router;
//# sourceMappingURL=collectionRoutes.js.map