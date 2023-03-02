"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to author'],
    },
    item: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Review must refer to item'],
    },
    body: {
        type: String,
        required: [true, 'Review must have a body text'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
//# sourceMappingURL=reviewModel.js.map