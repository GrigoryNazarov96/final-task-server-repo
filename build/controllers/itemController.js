"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.bulkDeleteItems = exports.createItem = exports.getItem = exports.getItems = void 0;
const error_1 = require("../error");
const itemModel_1 = __importDefault(require("../models/itemModel"));
const likeModel_1 = __importDefault(require("../models/likeModel"));
const getItems = async (req, res, next) => {
    var _a;
    try {
        throw new error_1.AppError('error in get items', 404);
        let query = req.query;
        const tags = req.query.tags;
        if (tags) {
            query.tags = { $in: tags };
        }
        const sort = req.query.asc ? 'asc' : 'desc';
        const page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 1;
        const items = await itemModel_1.default.find(query)
            .sort()
            .skip((page - 1) * 20)
            .limit(20)
            .populate(['owner', 'collectionId', 'likes'])
            .select('-__v -id');
        if (!items) {
            throw new error_1.AppError('No items found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                items,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getItems = getItems;
const getItem = async (req, res, next) => {
    var _a;
    try {
        const item = await itemModel_1.default.findById(req.params.id)
            .populate(['owner', 'collectionId', 'likes', { path: 'reviews', populate: 'author' }])
            .lean();
        if (!item) {
            throw new error_1.AppError('No item found', 404);
        }
        item.isLiked = !!(await likeModel_1.default.exists({ from: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, item: item._id }));
        res.status(200).json({
            status: 'success',
            data: {
                item,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getItem = getItem;
const createItem = async (req, res, next) => {
    var _a;
    try {
        const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const collectionId = req.body.collectionId;
        const item = await itemModel_1.default.create({ ...req.body, owner: ownerId, collectionId });
        res.status(201).json({
            status: 'success',
            data: {
                item,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.createItem = createItem;
const bulkDeleteItems = async (req, res, next) => {
    var _a, _b;
    try {
        const items = req.body.items;
        const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const isAdmin = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
        let result;
        if (isAdmin) {
            result = await itemModel_1.default.deleteMany({ _id: { $in: items } });
        }
        result = await itemModel_1.default.deleteMany({ _id: { $in: items }, owner: { $e: ownerId } });
        if (result.acknowledged) {
            return res.status(204).send('success');
        }
        res.status(400).send('Error');
    }
    catch (e) {
        next(e);
    }
};
exports.bulkDeleteItems = bulkDeleteItems;
const updateItem = async (req, res, next) => {
    try {
        const item = await itemModel_1.default.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            optionalFields: req.body.optionalFields,
            tags: req.body.tags,
        });
        res.status(200).json({
            status: 'success',
            data: {
                item,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.updateItem = updateItem;
//# sourceMappingURL=itemController.js.map