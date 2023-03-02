"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Item must have a name'],
    },
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: [true, 'Item must belong to owner'],
    },
    collectionId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Collection',
        required: [true, 'Item must belong to collection'],
    },
    description: {
        type: String,
        required: [true, 'Item must have a description'],
    },
    optionalFields: {
        optionalTextValue1: {
            type: String,
            default: null,
            required: false,
        },
        optionalTextValue2: {
            type: String,
            default: null,
            required: false,
        },
        optionalTextValue3: {
            type: String,
            default: null,
            required: false,
        },
        optionalNumberValue1: {
            type: Number,
            default: null,
            required: false,
        },
        optionalNumberValue2: {
            type: Number,
            default: null,
            required: false,
        },
        optionalNumberValue3: {
            type: Number,
            default: null,
            required: false,
        },
        optionalDateValue1: {
            type: Date,
            default: null,
            required: false,
        },
        optionalDateValue2: {
            type: Date,
            default: null,
            required: false,
        },
        optionalDateValue3: {
            type: Date,
            default: null,
            required: false,
        },
        optionalCheckboxValue1: {
            type: Boolean,
            default: null,
            required: false,
        },
        optionalCheckboxValue2: {
            type: Boolean,
            default: null,
            required: false,
        },
        optionalCheckboxValue3: {
            type: Boolean,
            default: null,
            required: false,
        },
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
itemSchema.index({ '$**': 'text' });
itemSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'item',
    localField: '_id',
    count: true,
});
itemSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'item',
    localField: '_id',
});
const Item = (0, mongoose_1.model)('Item', itemSchema);
exports.default = Item;
//# sourceMappingURL=itemModel.js.map