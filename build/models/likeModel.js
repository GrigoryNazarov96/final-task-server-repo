"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    item: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Item',
    },
});
likeSchema.index({ from: 1, item: 1 }, { unique: true });
const Like = (0, mongoose_1.model)('Like', likeSchema);
exports.default = Like;
//# sourceMappingURL=likeModel.js.map