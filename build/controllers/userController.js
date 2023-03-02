"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.bulkDeleteUsers = exports.changeUserRole = exports.bulkChangeUserStatus = exports.createUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getUsers = async (req, res, next) => {
    var _a;
    try {
        let query = {};
        const isBlocked = req.query.isBlocked;
        const sort = req.query.asc ? 'asc' : 'desc';
        const page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 1;
        if (isBlocked !== undefined) {
            query.isBlocked = { $e: isBlocked };
        }
        const users = await userModel_1.default.find(query)
            .sort(sort)
            .skip((page - 1) * 20)
            .limit(20)
            .lean();
        res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res, next) => {
    try {
        const user = await userModel_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({
            status: 'success',
            deta: {
                user,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.createUser = createUser;
const bulkChangeUserStatus = async (req, res, next) => {
    try {
        const users = req.body.users;
        const isBlock = req.body.isBlock;
        const result = await userModel_1.default.updateMany({ _id: { $in: users } }, { isBlocked: isBlock });
        if (result.acknowledged) {
            return res.status(200).send('success');
        }
        res.status(400);
    }
    catch (e) {
        next(e);
    }
};
exports.bulkChangeUserStatus = bulkChangeUserStatus;
const changeUserRole = async (req, res, next) => {
    try {
        const role = req.body.role;
        const user = await userModel_1.default.findByIdAndUpdate({ _id: req.params.id }, { role });
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.changeUserRole = changeUserRole;
const bulkDeleteUsers = async (req, res, next) => {
    try {
        const users = req.body;
        const result = await userModel_1.default.deleteMany({ _id: { $in: users } });
        if (result.acknowledged) {
            return res.status(204).send('success');
        }
        res.status(400);
    }
    catch (e) {
        next(e);
    }
};
exports.bulkDeleteUsers = bulkDeleteUsers;
const getUser = async (req, res, next) => {
    try {
        const user = await userModel_1.default.findById({ _id: req.params.id }).lean();
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=userController.js.map