"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewForItem = exports.getOneReviewPerItem = exports.createReviewForItem = exports.getReviewsPerItem = void 0;
const error_1 = require("../error");
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const getReviewsPerItem = async (req, res, next) => {
    try {
        const item = req.query.item;
        const reviews = await reviewModel_1.default.find({ item }).lean();
        res.status(200).json({
            status: 'success',
            data: {
                reviews,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getReviewsPerItem = getReviewsPerItem;
const createReviewForItem = async (req, res, next) => {
    try {
        const item = req.body.item;
        const author = req.body.author;
        if (!author) {
            throw new error_1.AppError('Only authenticated users can write reviews', 401);
        }
        const review = await reviewModel_1.default.create({ ...req.body, item, author });
        res.status(200).json({
            status: 'success',
            data: {
                review,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.createReviewForItem = createReviewForItem;
const getOneReviewPerItem = async (req, res, next) => {
    try {
        const item = req.query.item;
        const review = await reviewModel_1.default.findOne({ item, _id: req.params.id }).lean();
        res.status(200).json({
            status: 'success',
            data: {
                review,
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.getOneReviewPerItem = getOneReviewPerItem;
const deleteReviewForItem = async (req, res, next) => {
    try {
        const item = req.body.item;
        const candidate = req.user;
        const isAuthor = (candidate === null || candidate === void 0 ? void 0 : candidate._id.toString()) === req.body.author.toString();
        if ((candidate === null || candidate === void 0 ? void 0 : candidate.role) === 'admin' || isAuthor) {
            await reviewModel_1.default.deleteOne({ item, author: req.body.author });
        }
        else {
            throw new error_1.AppError('You can not perform this action', 401);
        }
    }
    catch (e) {
        next(e);
    }
};
exports.deleteReviewForItem = deleteReviewForItem;
//# sourceMappingURL=reviewController.js.map