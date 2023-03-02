"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const collectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Collection must have a name'],
    },
    description: {
        type: String,
        required: true,
    },
    imageCover: String,
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: [true, 'Item must have an owner'],
    },
    theme: {
        type: String,
        required: true,
    },
    optionalFields: {
        optionalTextTitle1: {
            type: String,
            default: null,
            required: false,
        },
        optionalTextTitle2: {
            type: String,
            default: null,
            required: false,
        },
        optionalTextTitle3: {
            type: String,
            default: null,
            required: false,
        },
        optionalNumberTitle1: {
            type: String,
            default: null,
            required: false,
        },
        optionalNumberTitle2: {
            type: String,
            default: null,
            required: false,
        },
        optionalNumberTitle3: {
            type: String,
            default: null,
            required: false,
        },
        optionalDateTitle1: {
            type: String,
            default: null,
            required: false,
        },
        optionalDateTitle2: {
            type: String,
            default: null,
            required: false,
        },
        optionalDateTitle3: {
            type: String,
            default: null,
            required: false,
        },
        optionalCheckboxTitle1: {
            type: String,
            default: null,
            required: false,
        },
        optionalCheckboxTitle2: {
            type: String,
            default: null,
            required: false,
        },
        optionalCheckboxTitle3: {
            type: String,
            default: null,
            required: false,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Collection = (0, mongoose_1.model)('Collection', collectionSchema);
exports.default = Collection;
//# sourceMappingURL=collectionModel.js.map