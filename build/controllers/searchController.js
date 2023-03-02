"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = void 0;
const itemModel_1 = __importDefault(require("../models/itemModel"));
const getResults = async (req, res) => {
    const searchString = req.query.searchString;
    const results = await itemModel_1.default.aggregate([
        {
            $lookup: {
                from: 'collections',
                localField: 'collectionId',
                foreignField: '_id',
                as: 'collection',
            },
        },
        {
            $unwind: '$collection',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
            },
        },
        {
            $unwind: '$owner',
        },
        {
            $match: {
                $or: [
                    { name: { $regex: searchString } },
                    { 'owner.email': { $regex: searchString } },
                    { 'owner.name': { $regex: searchString } },
                    { 'collection.theme': { $regex: searchString } },
                    { 'collection.name': { $regex: searchString } },
                ],
            },
        },
    ]);
    res.status(200).json({
        status: 'success',
        count: results.length,
        data: {
            results,
        },
    });
};
exports.getResults = getResults;
//# sourceMappingURL=searchController.js.map