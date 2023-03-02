"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/login', authController_1.login);
router.post('/signup', authController_1.signup);
router.get('/logout', authController_1.logout);
router
    .route('/')
    .get((0, authController_1.protect)(), (0, authController_1.restrictTo)('admin'), userController_1.getUsers)
    .post((0, authController_1.protect)(), (0, authController_1.restrictTo)('admin'), userController_1.createUser)
    .patch((0, authController_1.protect)(), (0, authController_1.restrictTo)('admin'), userController_1.bulkChangeUserStatus)
    .delete((0, authController_1.protect)(), (0, authController_1.restrictTo)('admin'), userController_1.bulkDeleteUsers);
router.route('/:id').get(userController_1.getUser).patch((0, authController_1.protect)(), (0, authController_1.restrictTo)('admin'), userController_1.changeUserRole);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map