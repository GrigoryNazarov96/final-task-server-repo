"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLikeForItem = exports.createLikeForItem = exports.getLikesCountPerItem = void 0;
const likeModel_1 = __importDefault(require("../models/likeModel"));
const getLikesCountPerItem = async (req, res) => {
    try {
        const item = req.query.item;
        const likesCount = await likeModel_1.default.find({ item }).count();
        res.status(200).json({
            status: 'success',
            data: {
                likesCount,
            },
        });
    }
    catch (e) {
        res.send(e.message);
    }
};
exports.getLikesCountPerItem = getLikesCountPerItem;
const createLikeForItem = async (req, res) => {
    try {
        const item = req.body.item;
        const from = req.body.from;
        await likeModel_1.default.create({ item, from });
        res.status(201).send('success');
    }
    catch (e) {
        res.send(e.message);
    }
};
exports.createLikeForItem = createLikeForItem;
const removeLikeForItem = async (req, res) => {
    try {
        const item = req.body.item;
        const from = req.body.from;
        await likeModel_1.default.findOneAndDelete({ item, from });
        res.status(204).send('success');
    }
    catch (e) {
        res.send(e.message);
    }
};
exports.removeLikeForItem = removeLikeForItem;
//# sourceMappingURL=likeController.js.map