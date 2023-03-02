"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const likeController_1 = require("../controllers/likeController");
const router = express_1.default.Router();
router
    .route('/')
    .get(likeController_1.getLikesCountPerItem)
    .post((0, authController_1.protect)(), likeController_1.createLikeForItem)
    .delete((0, authController_1.protect)(), likeController_1.removeLikeForItem);
exports.default = router;
//# sourceMappingURL=likeRoutes.js.map