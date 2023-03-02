"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const reviewController_1 = require("../controllers/reviewController");
const router = express_1.default.Router();
router
    .route('/')
    .get((0, authController_1.protect)({ allowNonAuthorized: true }), reviewController_1.getReviewsPerItem)
    .post((0, authController_1.protect)(), reviewController_1.createReviewForItem);
router.route('/:id').delete((0, authController_1.protect)(), reviewController_1.deleteReviewForItem);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map