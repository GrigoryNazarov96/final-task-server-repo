"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatured = exports.deleteCollection = exports.updateCollection = exports.getCollection = exports.createCollection = exports.getCollections = void 0;
const error_1 = require("../error");
const collectionModel_1 = __importDefault(require("../models/collectionModel"));
const itemModel_1 = __importDefault(require("../models/itemModel"));
const getCollections = async (req, res, next) => {
    var _a;
    try {
        let query = req.query;
        const sort = req.query.asc ? 'asc' : 'desc';
        const page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 1;
        const collections = await collectionModel_1.default.find(query)
            .sort(sort)
            .skip((page - 1) * 20)
            .limit(20)
            .lean()
            .populate('owner');
        if (!collections) {
            throw new error_1.AppError('No collections found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                collections,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getCollections = getCollections;
const createCollection = async (req, res, next) => {
    var _a, _b;
    try {
        let owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin' && req.body.owner) {
            owner = req.body.owner;
        }
        const body = req.body;
        const collection = await collectionModel_1.default.create({ ...body, owner });
        res.status(201).json({
            status: 'success',
            data: {
                collection,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.createCollection = createCollection;
const getCollection = async (req, res, next) => {
    try {
        const collection = await collectionModel_1.default.findById({ _id: req.params.id }).populate('owner').lean();
        if (!collection) {
            throw new error_1.AppError('No collection found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                collection,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getCollection = getCollection;
const updateCollection = async (req, res, next) => {
    try {
        const collection = await collectionModel_1.default.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            theme: req.body.theme,
            optionalFields: req.body.optionalFields,
            updatedAt: Date.now(),
        });
        res.status(200).json({
            status: 'success',
            data: {
                collection,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.updateCollection = updateCollection;
const deleteCollection = async (req, res, next) => {
    var _a;
    try {
        const candidate = req.user;
        const collection = await collectionModel_1.default.findById({ _id: req.params.id });
        if ((candidate === null || candidate === void 0 ? void 0 : candidate._id.toString()) === (collection === null || collection === void 0 ? void 0 : collection.owner.toString()) || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin') {
            await collectionModel_1.default.deleteOne({ collection });
            return res.status(204).send('success');
        }
        else {
            throw new error_1.AppError('You can not delete collection that does not belong to you', 401);
        }
    }
    catch (e) {
        next(e);
    }
};
exports.deleteCollection = deleteCollection;
const getFeatured = async (req, res, next) => {
    try {
        const collections = await itemModel_1.default.aggregate([
            {
                $lookup: {
                    from: 'collections',
                    localField: 'collectionId',
                    foreignField: '_id',
                    as: 'collection',
                },
            },
            {
                $group: { _id: '$collectionId', count: { $sum: 1 } },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                collections,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getFeatured = getFeatured;
//# sourceMappingURL=collectionController.js.map